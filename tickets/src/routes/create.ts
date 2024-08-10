import { 
  AuthHandler, 
  AuthRequest, 
  Body, 
  Channels, 
  natsClient, 
  NATSPublisher, 
  TicketCreatedEvent, 
  TicketsCreateDTO, 
  validateRequest 
} from '@app2/common';
import express, { Response } from 'express';
import { Tickets } from '../models/tickets';

const router = express.Router();

router.post('/', 
  AuthHandler,
  validateRequest({
    body: TicketsCreateDTO,
  }),
  async ({ body: { price, title }, user }: AuthRequest & Body<TicketsCreateDTO>, res: Response) => {
    const ticket = Tickets.build({ price, title, userId: user!.id });

    await ticket.save();
    await new NATSPublisher(natsClient.client).publish<TicketCreatedEvent>(Channels.TICKET_CREATED, {
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,  
      version: ticket.version,
    });
    
    res.status(201).send(ticket);
  }
);

export { router as createRouter }