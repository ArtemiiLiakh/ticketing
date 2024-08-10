export interface PaymentCreatedEvent {
  id: string;
  orderId: string;
  stripeId: string;
  amount: number;
  currency: string;
}