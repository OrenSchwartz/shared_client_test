# A dedicated large machine (30Gb+ RAM) needed
# You'd better run the script in tmux to overcome possible ssh disconnections
# Look at the bottom and adjust the settings

ActiveRecord::Base.logger.level = 1
module GetTaxi
  class AccountingExportScript
    CLIENT_ID = 29_901

    class << self
      include AccountingHelper
      # Sample invocation:
      # GetTaxi::AccountingExportScript.export_invoices(Time.zone.parse("1/9/2012"),Time.zone.parse("1/10/2012"))
      # Notice the Time.zone.parse and not just Time.zone.
      def export_invoices(start_date, end_date)
        invoices = Invoice.where('created_at > ? and created_at < ?', start_date, end_date).includes(order: :division)
        export_invoices = []
        headers = ['Num', 'Class system name', 'Credit card code', 'Date', 'Invoice number', 'Order ID', 'פריט', 'before tax', 'after taxs']

        invoices.find_each do |invoice|
          num = 1
          export_invoices << [
            num,
            (invoice.order.division.title if invoice.order.division),
            invoice.client_credit_card_number,
            invoice.created_at.strftime('%d/%m/%y'),
            invoice.full_id,
            invoice.order_id,
            'Total invoice',
            '',
            invoice.amount_with_vat
          ]
          invoice.category_components.each do |component|
            num += 1
            export_invoices << [
              num,
              '',
              '',
              '',
              invoice.full_id,
              '',
              component[:name],
              BillingCCModule.deduct_vat(component[:value], SystemSetting.server.vat.to_d).round(2),
              ''
            ]
          end
        end
        { headers: headers, rows: export_invoices }
      end

      def export_invoices_by_ids(first_id, last_id)
        invoices = Invoice.where('id >= ? and id <= ?', first_id, last_id).includes(:order)
        export_invoices = []
        headers = ['Num', 'Class system name', 'Credit card code', 'Date', 'Invoice number', 'Order ID', 'פריט', 'before tax', 'after taxs']

        invoices.find_each do |invoice|
          num = 1
          export_invoices << [
            num,
            (invoice.order.division.title if invoice.order.division),
            invoice.client_credit_card_number,
            invoice.created_at.strftime('%d/%m/%y'),
            invoice.full_id,
            invoice.order_id,
            'Total invoice',
            '',
            invoice.amount_with_vat
          ]
          invoice.category_components.each do |component|
            num += 1
            export_invoices << [
              num,
              '',
              '',
              '',
              invoice.full_id,
              '',
              component[:name],
              BillingCCModule.deduct_vat(component[:value], SystemSetting.server.vat.to_d).round(2),
              ''
            ]
          end
        end
        { headers: headers, rows: export_invoices }
      end

      def export_refund_invoices(start_date, end_date)
        refund_invoices = RefundInvoice.where('created_at > ? and created_at < ?', start_date, end_date).includes(:order)
        export_refund_invoices = []
        headers = ['Num', 'Class system name', 'Credit card code', 'Date', 'Invoice number', 'Order ID', 'פריט', 'before tax', 'after taxs']

        refund_invoices.find_each do |invoice|
          if invoice.tips_amount.to_d != 0
            export_refund_invoices << [
              '1',
              invoice.order.division.title,
              invoice.client_credit_card_number,
              invoice.created_at.strftime('%d/%m/%y'),
              invoice.full_id,
              invoice.order_id,
              'Total invoice',
              '',
              -invoice.amount_with_vat
            ]
            export_refund_invoices << [
              '2',
              '',
              '',
              '',
              invoice.full_id,
              '',
              'Tips',
              -BillingCCModule.deduct_vat(invoice.tips_amount, SystemSetting.server.vat.to_d).round(2),
              ''
            ]
          end
        end
        { headers: headers, rows: export_refund_invoices }
      end

      def export_invoices_to_tsv(exports)
        combined = []
        combined << exports[:headers]
        (0..exports[:rows].count - 1).each do |i|
          combined << exports[:rows][i]
        end
        combined.map { |row| row.join("\t") }
      end

      def export_receipts(start_date, end_date, file_name)
        index = 1
        f_errors = File.open("errors_#{file_name}", 'a')
        File.open(file_name, 'a') do |f|
          Receipt.where('created_at > ? and created_at < ?', start_date, end_date).includes(:order).find_in_batches(batch_size: 2000) do |batch|
            puts "Batch no. #{index}"
            index += 1
            export_receipts = []
            export_receipts_details = []

            batch.each do |receipt|
              # next unless receipt.ride_amount && receipt.tips_amount
              begin
                awv = receipt.paid_with_credit
              rescue
                awv = nil
                f_errors << "#{receipt.id}\n"
              end
              next if awv.nil?

              order = receipt.order
              export_receipts << [
                1,
                CLIENT_ID,
                receipt.created_at.strftime('%d/%m/%y'),
                '',
                0,
                receipt.full_id,
                '',
                receipt.order_id,
                '',
                order.driver_id,
                ''
              ]
              export_receipts_details << [
                3,
                payment_type_id_of_order(order, receipt.user_id),
                receipt.client_credit_card_number.strip[-4..-1],
                '',
                awv,
                1,
                '',
                '',
                '',
                '',
                ''
              ]
            end
            f << GetTaxi::AccountingExportScript.to_tab_delimited([export_receipts, export_receipts_details]).join("\n")
          end
          f << "\n"
        end
      end

      def export_negative_receipts(start_date, end_date, file_name)
        index = 1
        f_errors = File.open("errors_#{file_name}", 'a')
        File.open(file_name, 'a') do |f|
          Receipt.where('created_at > ? and created_at < ?', start_date, end_date).includes(:order).find_in_batches(batch_size: 2000) do |batch|
            puts "Batch no. #{index}"
            index += 1
            export_receipts = []
            export_receipts_details = []

            batch.each do |receipt|
              begin
                awv = receipt.amount_with_vat
              rescue
                awv = nil
                f_errors << "#{receipt.id}\n"
              end
              next if awv.nil?
              # puts "******** receipt_id is #{receipt.id} and awv is #{awv} *******"
              next unless awv < 0
              # next unless receipt.ride_amount && receipt.tips_amount

              order = receipt.order
              export_receipts << [
                1,
                CLIENT_ID,
                receipt.created_at.strftime('%d/%m/%y'),
                '',
                0,
                receipt.full_id,
                '',
                receipt.order_id,
                '',
                order.driver_id,
                ''
              ]
              export_receipts_details << [
                3,
                payment_type_id_of_order(order, receipt.user_id),
                receipt.client_credit_card_number.strip[-4..-1],
                '',
                awv,
                1,
                '',
                '',
                '',
                '',
                ''
              ]
            end
            f << GetTaxi::AccountingExportScript.to_tab_delimited([export_receipts, export_receipts_details]).join("\n")
          end
          f << "\n"
        end
      end

      def to_tab_delimited(exports)
        combined = []
        (0..exports.first.count - 1).each do |i|
          combined << exports.first[i]
          combined << exports.second[i]
        end
        combined.map { |row| row.join("\t") }
      end
    end
  end
end

def export(month, year)
  israel_timezone = ActiveSupport::TimeZone.new('Israel')
  date = Time.new(year, month, 1)
  from = israel_timezone.local_to_utc(date.beginning_of_month)
  to   = israel_timezone.local_to_utc(date.end_of_month)

  puts "Creating report from #{from} to #{to}"
  GetTaxi::AccountingExportScript.export_receipts(from, to, "receipts-#{year}#{month}.tsv")
  # report = GetTaxi::AccountingExportScript.export_receipts(from, to)
  # File.write("receipts-#{year}#{month}.tsv", GetTaxi::AccountingExport.to_tab_delimited(report).join("\n"))
  #
  # report = GetTaxi::AccountingExportScript.export_invoices(from, to)
  # File.write("invoices-#{year}#{month}.tsv", GetTaxi::AccountingExport.export_invoices_to_tsv(report).join("\n"))
end

# export(12, 2014) # The only two parameters represent the report month and year
# export_by_ids(385_124, 407_649)

# scp gtdeploy@54.170.126.194:/var/www/projects/gettaxi/current/invoices-*.tsv .
# scp gtdeploy@54.170.126.194:/var/www/projects/gettaxi/current/receipts-*.tsv .

#  load "#{Rails.root}/script/receipts_invoices.rb"
#  israel_timezone = ActiveSupport::TimeZone.new('Israel')
#  month = 2
#  year = 2016
#  date = Time.new(year, month, 1)
#  from = israel_timezone.local_to_utc(date.beginning_of_month)
#  to   = israel_timezone.local_to_utc(date.end_of_month)
#  puts "Creating report from #{from} to #{to}"
#  GetTaxi::AccountingExportScript.export_receipts(from, to, "harel-receipts-fixed-v4-#{year}#{month}.tsv")

# israel_timezone = ActiveSupport::TimeZone.new("Israel")
# month = 10
# year = 2015
# date = Time.new(year, month, 1)
# from = israel_timezone.local_to_utc(date.beginning_of_month)
# to   = Time.now+1.days
# puts "Creating report from #{from} to #{to}"
# GetTaxi::AccountingExport.export_negative_receipts(from, to, "negative-receipts-from-#{year}#{month}.tsv")
