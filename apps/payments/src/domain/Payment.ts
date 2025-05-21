export interface Payment {
  orderId: string;
  stripeId: string;
  price: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}