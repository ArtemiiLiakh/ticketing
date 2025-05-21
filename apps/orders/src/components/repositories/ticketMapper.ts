import { Ticket } from '@domain/Ticket';
import { TicketDocument } from '@models/tickets';

export const ticketMapper = (ticket: TicketDocument): Ticket => ({
  id: ticket.publicId,
  userId: ticket.userId,
  title: ticket.title,
  price: ticket.price,
  createdAt: ticket.createdAt,
  updatedAt: ticket.updatedAt,
  version: ticket.version,
});