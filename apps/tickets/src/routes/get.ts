import { Query } from '@app2/common/types';
import { TicketComponentDI } from '@components/di/TicketComponentDI';
import { GetTicketsDTO } from '@components/ticket/handlers/GetTickets/GetTicketsDTO';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/:ticketId', 
  async (req: Request, res: Response) => {
    const ticket = await TicketComponentDI.getById({
      id: req.params.ticketId,
    });

    res.status(200).send(ticket);
  }
);

router.get('/', async (req: Query<GetTicketsDTO>, res: Response) => {
  const tickets = await TicketComponentDI.getTickets({
    cursor: req.query.cursor,
    pageSize: +req.query.pageSize,
  });

  res.send(tickets);
});

export { router as getRouter };

