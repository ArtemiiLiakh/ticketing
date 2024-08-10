import { OrderStatus } from "../../types";

export interface OrderCreatedEvent {
  id: string;
  status: OrderStatus;
  userId: string;
  expiresAt: number;
  ticket: {
    id: string;
    price: number;
  };
  version: number;
}