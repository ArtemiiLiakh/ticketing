export interface CreatePaymentDTO {
  orderId: string;
  executorId: string,
  payment_method_types: string[];
  idempotencyKey?: string;
}