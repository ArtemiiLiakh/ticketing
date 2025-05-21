import { Nullable, OrderStatus } from '@app2/common/types';
import { Ticket } from '@domain/Ticket';
import { OrderModel } from '@models/orders';
import { TicketModel } from '@models/tickets';
import { ticketMapper } from './ticketMapper';

interface UpdateTicket {
  title?: string,
  price?: number,
  userId?: string,
  updatedAt?: Date,
  version?: number,
}

export class TicketRepository {
  async create (ticket: Partial<Ticket>): Promise<Ticket> {
    const newTicket = await TicketModel.create({
      publicId: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
      version: ticket.version,
    });

    return ticketMapper(newTicket);
  }

  async update (id: string, ticket: UpdateTicket): Promise<void> {
    await TicketModel.updateOne({
      publicId: id,
    }, {
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      updatedAt: ticket.updatedAt,
      version: ticket.version,
    });
  }
  
  async getById (id: string): Promise<Nullable<Ticket>> {
    const ticket = await TicketModel.findOne({
      publicId: id,
    });

    if (!ticket) return null; 

    return ticketMapper(ticket);
  }

  async isReserved (id: string): Promise<boolean> {
    const order = await OrderModel.findOne({
      publicId: id,
      status: {
        $in: [
          OrderStatus.CREATED, OrderStatus.PENDING, OrderStatus.COMPLETE,
        ],
      },
    });
    return !!order;
  }
}