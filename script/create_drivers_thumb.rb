#!/usr/bin/env ruby

def upload(driver)
  thumbnail = driver.thumbnail

  fail 'Can not get the thumbnail path' unless thumbnail.present?

  bucket = URI.parse(thumbnail).host
  full_path = URI.parse(thumbnail).path
  full_path = full_path[1, full_path.length - 1] # remove leading slash

  if S3Uploader.find(full_path, bucket).empty?
    picture = driver.picture

    fail 'No image' unless picture.present?

    uri = URI.parse(picture)

    URI.parse("http://#{uri.host}#{uri.path}").open do |f|
      S3ImageUploader.upload(f, full_path: full_path, resize: true, access: 'public-read')
    end

  end

  thumbnail
end

puts 'Processing...'

Driver.all.each do |driver|
  begin
    puts upload(driver)
  rescue => msg
    puts "Driver #{driver.id}: #{msg}"
  end
end

puts 'End'
