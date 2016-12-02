#!/usr/bin/env ruby
require File.expand_path(File.join(File.dirname(__FILE__), '..', 'config', 'environment'))

def step_1_all_by_invoice
  options = base_options
  min_date = '2016-06-26'

  invoices = get_invoices_for_receipts(min_date)
  invoices.each do |i|
    cancellation_fee_amount = get_invoice_value(i[:order_id])
    next unless cancellation_fee_amount
    options.merge!(
      cancellation_fee_amount: cancellation_fee_amount,
      user_id: i.order.riding_user.user.id
    )
    receipt = Receipt.find_by_order_id(i[:order_id])
    next if receipt
    receipt = Receipt.create_from_order(i.order, options)
    receipt.update_attribute(:created_at, i[:created_at])
    puts "successfully updated receipt to invoice, receipt id: #{receipt.id}"
  end
end

def get_invoices_for_receipts(min_date)
  invoices_need_receipt = Invoice.where('created_at >= ?', min_date).where('cancellation_fee_amount > 0').map(&:order_id)
  current_receipts = Receipt.where('order_id in (?)', invoices_need_receipt).where('cancellation_fee_amount > 0').map(&:order_id)
  orders_need_receipt = invoices_need_receipt - current_receipts
  Invoice.find_all_by_order_id orders_need_receipt
end

def step_2_create_cancellation_refunds
  options = base_options
  min_date = '2016-06-26'

  invoices = get_invoices_for_refund(min_date)
  invoices.each do |i|
    cancellation_fee_amount = i[:cancellation_fee_amount].to_i.abs * -1
    next unless cancellation_fee_amount < 0
    options.merge!(
      cancellation_fee_amount: cancellation_fee_amount,
      user_id: i.order.riding_user.user.id
    )
    receipt = Receipt.create_refund(i.order, options)
    receipt.update_attribute(:created_at, i[:created_at])
    puts "successfully updated receipt to invoice, receipt id: #{receipt.id}"
  end
end

def get_invoices_for_refund(min_date)
  expected_refund = RefundInvoice.where('created_at > ?', min_date).where('cancellation_fee_amount > 0').map(&:order_id)
  current_refund = Receipt.where('order_id in (?)', expected_refund).where('cancellation_fee_amount < 0').map(&:order_id)
  need_refund = expected_refund - current_refund
  RefundInvoice.find_all_by_order_id need_refund
end

def get_invoice_value(order_id)
  invoice = Invoice.find_by_order_id(order_id)
  invoice[:cancellation_fee_amount].to_d if invoice
end

def base_options
  {
    ride_amount: 0,
    tips_amount: 0,
    service_fee: 0,
    additional_fee: 0,
    extras: 0,
    waiting_time: 0
  }
end
