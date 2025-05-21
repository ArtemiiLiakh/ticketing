import { Ticket } from '@domain/Ticket';
import { TicketDocument } from '@models/TicketModel';

export const ticketMapper = (ticket: TicketDocument): Ticket => ({
  id: ticket.publicId,
  userId: ticket.userId,
  orderId: ticket.orderId,
  title: ticket.title,
  price: ticket.price,
  createdAt: ticket.createdAt,
  updatedAt: ticket.updatedAt,
  version: ticket.version,
});