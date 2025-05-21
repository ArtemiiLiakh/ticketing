import { PaymentInstance } from '../../../services/PaymentService';

export interface CreatePaymentResponse {
  orderId: string,
  payment_service_details: PaymentInstance,
}