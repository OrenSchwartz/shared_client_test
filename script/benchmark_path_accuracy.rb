# comparison = PathBenchmark.benchmark_paths(paths, google_paths)
ActiveRecord::Base.logger.level = 1

# 1. Load out a bunch of order from Location with timestamps (however many I can fetch (sleep!))
# 2. Store them somewhere so I don't lose them
# 3. Run google path algs on them, store that too.

# bench_last_1000 = PathBenchmark.benchmark_path_accuracy!(Order.completed.last(1000))
# Results:
# Show average (median?) diffs over the set
# Show rows with 10 largest diffs

# orders = Order.completed.last(100)
# orders = Order.completed.last(100)
# orders = Order.completed.order('id desc').offset(100000).first(100)

module PathBenchmark

  class Point
    attr_accessor :lat, :lon, :ts

    def initialize(data)
      if data.is_a? Array # Location service format without timestamp
        @lat, @lon = data.first, data.second
      else
        data = data.with_indifferent_access
        if data[:location] # Location service format with timestamp
          @lat, @lon, @ts = data[:location].first, data[:location].second, data[:ts]
        else # for doing deserialization after to_json
          @lat, @lon, @ts = data.values_at(:lat, :lon, :ts)
        end
      end
    end
  end

  class << self

    def path_from_email_receipt(order)
      return unless order.email_receipt && order.email_receipt.path_points
      JSON(order.email_receipt.path_points).map { |p| Point.new(p) }
    end

    def distance_from_path(path)
      previous_point = nil
      path.reduce(0) do |distance, point|
        distance += distance_between_points(previous_point, point) if previous_point
        previous_point = point
        distance
      end
    end

    # [5085875,5085989,5086083,5086211,5086499,5086814,5087088,5087472,5087733].inject({}) do |h, order_id|
    #   h[order_id] = PathBenchmark.google_distance_for_order(Order.find(order_id))
    #   h
    # end
    # Uses email_receipt distance
    def google_distance_for_order(order)
      return unless path = path_from_email_receipt(order)
      google_path = google_roads_path(path)
      distance_from_path(google_path)
    end

    def distance_between_points(point1, point2)
      GeoUtil.distance_between(point1.lat.to_f, point1.lon.to_f, point2.lat.to_f, point2.lon.to_f)
    end

    def google_roads_path(path)
      path.each_slice(100).map do |path_segment|
        path_for_google = path_segment.map {|p| "#{p.lat},#{p.lon}"}.join('|')
        old_key = 'AIzaSyBmgcuoNZLqQG7I51V9dk_mUoadHi438P8'
        key = 'AIzaSyAmcx8OP24-pblS3PPFuuMRhSNbQI-_3MM'
        url = "https://roads.googleapis.com/v1/snapToRoads?interpolate=true&key=#{key}&path=#{URI.encode(path_for_google)}"
        # puts "url: #{url}, signed url: #{sign(url)}"
        result = JSON(RestClient.get(url), symbolize_names: true)
        result[:snappedPoints]
      end.flatten.map {|p| Point.new(lat: p[:location][:latitude], lon: p[:location][:longitude])}
    end

    def path_from_location_service(order, params = {})
      params.reverse_merge!(ts: true)

      order_start = order.started_at || order.arrived_at
      return unless order_start.present? && order.ended_at.present?
      url = "#{SystemSetting.services.location_service_url}api/v1/orders/#{order.id}/locations"
      params = params.merge({
                                env: SystemSetting.server.environment_id,
                                from_ts: (order_start.to_i * 1000),
                                to_ts: (order.ended_at.to_i * 1000)
                            })

      RestClient.get url, params: params do |response, _request, _result|
        data = JSON(response.body, symbolize_names: true)

        path =
            if data.present?
              data[:locations].map do |l|
                Point.new(lat: l[:location][1], lon: l[:location][0], ts: l[:_id])
              end
            else
              []
            end
        path.size == 0 ? 0 : distance_from_path(path)
      end
    rescue Exception => ex
      0
    end
  end

end
