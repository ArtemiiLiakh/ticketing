export class TicketUpdatedEvent {
  id: string;
  userId: string;
  title: string;
  price: number;
  orderId?: string;
  version: number;
}