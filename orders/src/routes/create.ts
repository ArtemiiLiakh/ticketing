import { 
  AuthHandler, 
  AuthRequest, 
  BadBodyException, 
  Body, 
  Channels, 
  NATSPublisher, 
  NoEnityWithIdException, 
  OrderCreatedEvent, 
  OrderStatus, 
  OrdersCreateDTO, 
  natsClient, 
  validateRequest
} from '@app2/common';
import express, { Response } from 'express';
import { Tickets } from '../models/tickets';
import config from '../config';
import { Orders } from '../models/orders';

const router = express.Router()

router.post(
  '/', 
  AuthHandler,
  validateRequest({
    body: OrdersCreateDTO,
  }),
  async ({ body: { ticketId }, user }: AuthRequest & Body<OrdersCreateDTO>, res: Response) => {
    const ticket = await Tickets.findById(ticketId);
    
    if (!ticket) {
      throw new NoEnityWithIdException('Ticket');
    }

    if (await ticket.isReserved()) {
      throw new BadBodyException('Ticket with such id is already reserved');
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + config.ORDER_EXPIRATION);
  
    const order = Orders.build({
      userId: user!.id,
      expiresAt: expiration,
      status: OrderStatus.CREATED,
      ticket,
    });

    await order.save();
    await new NATSPublisher(natsClient.client).publish<OrderCreatedEvent>(
      Channels.ORDER_CREATED, 
      {
        id: order.id,
        userId: order.userId,
        status: order.status,
        expiresAt: order.expiresAt.getTime(),
        ticket: {
          id: ticket.id,
          price: ticket.price,
        },
        version: order.version,
      }
    );

    res.status(201).send(order);
  }
);

export { router as createRouter };