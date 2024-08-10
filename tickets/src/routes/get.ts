import { NoEnityWithIdException, NotFoundException } from '@app2/common';
import express, { Request, Response } from 'express';
import { Tickets } from '../models/tickets';

const router = express.Router();

router.get('/:ticketId', 
  async (req: Request, res: Response) => {
    const ticket = await Tickets.findById(req.params.ticketId);
    
    if (!ticket) {
      throw new NoEnityWithIdException('Ticket');
    }

    res.status(200).send(ticket);
  }
);

router.get('/', async (req: Request, res: Response) => {
  const tickets = await Tickets.find({
    orderId: undefined,
  });
  res.send({
    tickets,
  });
});

export { router as getRouter }