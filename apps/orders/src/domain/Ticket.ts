export interface Ticket {
  id: string;
  title: string;
  price: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}