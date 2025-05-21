import { Nullable } from '@app2/common/types';
import { CursorByDate } from '@components/ticket/handlers/GetTickets/PaginationCursor/CursorByDate';
import { Ticket } from '@domain/Ticket';
import { TicketDocument, TicketModel } from '@models/TicketModel';
import { FilterQuery } from 'mongoose';
import { ticketMapper } from './ticketMapper';

interface CreateTicket {
  userId: string;
  title: string;
  price: number;
}

interface UpdateTicket {
  title?: string;
  price?: number;
}

export class TicketRepository {
  async create (ticket: CreateTicket): Promise<Ticket> {
    const entity = await TicketModel.create({
      userId: ticket.userId,
      price: ticket.price,
      title: ticket.title,
    });

    return ticketMapper(entity);
  }

  async getById (id: string): Promise<Nullable<Ticket>> {
    const ticket = await TicketModel.findOne({
      publicId: id,
    });

    if (!ticket) return null;

    return ticketMapper(ticket);
  }

  async getMany (limit: number, cursor?: CursorByDate): Promise<Ticket[]> {
    const filter: FilterQuery<TicketDocument> = cursor ? {
      publicId: {
        $lt: cursor.lastId,
      },
      createdAt: {
        $lte: cursor.lastDate,
      }
    } : {};
    
    const tickets = await TicketModel.find(filter).limit(limit).sort({
      createdAt: 'desc',
    });

    return tickets.map(ticketMapper);
  }

  async update (id: string, data: UpdateTicket): Promise<void> {
    await TicketModel.updateOne({
      publicId: id,
    }, {
      title: data.title,
      price: data.price,
    });
  }

  async setOrderId(ticketId: string, orderId: string): Promise<void> {
    await TicketModel.updateOne({
      publicId: ticketId,
    }, {
      orderId,
    });
  }

  async clearOrderId(ticketId: string): Promise<void> {
    await TicketModel.updateOne({
      publicId: ticketId,
    }, {
      orderId: null,
    });
  }
}