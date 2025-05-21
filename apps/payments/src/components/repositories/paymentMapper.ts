import { Payment } from '@domain/Payment';
import { PaymentsDocument } from '@models/PaymentModel';

export const paymentMapper = (payment: PaymentsDocument): Payment => ({
  orderId: payment.orderId,
  stripeId: payment.stripeId,
  price: payment.price,
  currency: payment.currency,
  createdAt: payment.createdAt,
  updatedAt: payment.updatedAt,
  version: payment.version,
});