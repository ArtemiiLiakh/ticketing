export interface PaymentCreatedEvent {
  orderId: string;
  stripeId: string;
  amount: number;
  currency: string;
}