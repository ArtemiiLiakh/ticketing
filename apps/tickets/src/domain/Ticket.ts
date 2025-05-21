export interface Ticket {
  id: string;
  userId: string;
  title: string;
  price: number;
  orderId?: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}