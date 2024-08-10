import { 
  AuthHandler,
  AuthRequest,
  BadBodyException,
  Body, 
  Channels, 
  NATSPublisher, 
  NotFoundException, 
  Params, 
  TicketUpdatedEvent, 
  TicketsUpdateDTO, 
  natsClient, 
  validateRequest 
} from '@app2/common';
import express, { Response } from 'express';
import { Tickets } from '../models/tickets';

const router = express.Router();

router.patch('/:ticketId', 
  AuthHandler,
  validateRequest({
    body: TicketsUpdateDTO,
  }), 
  async ({ params, body }: AuthRequest & Params<{ ticketId: string }> & Body<TicketsUpdateDTO>, res: Response) => {
    const ticket = await Tickets.findById(params.ticketId);

    if (!ticket) {
      throw new NotFoundException();
    }

    if (ticket.orderId) {
      throw new BadBodyException('Cannot update reserved ticket');
    }

    ticket.set({
      title: body.title ?? ticket.title,
      price: body.price ?? ticket.price,
    });

    await ticket.save();
    await new NATSPublisher(natsClient.client).publish<TicketUpdatedEvent>(Channels.TICKET_UPDATED, {
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.send({
      title: ticket.title,
      price: ticket.price,
    });
});

export { router as updateRouter };