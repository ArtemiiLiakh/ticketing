import { TicketsCreateDTO } from '@app2/common/dtos';
import { AuthHandler } from '@app2/common/middlewares';
import { AuthRequest, Body } from '@app2/common/types';
import { validateRequest } from '@app2/common/utils';
import { TicketComponentDI } from '@components/di/TicketComponentDI';
import express, { Response } from 'express';

const router = express.Router();

router.post('/', 
  AuthHandler,
  validateRequest({
    body: TicketsCreateDTO,
  }),
  async ({ body: { price, title, user } }: AuthRequest & Body<TicketsCreateDTO>, res: Response) => {
    const ticket = await TicketComponentDI.createTicket({
      ownerId: user.id,
      title,
      price,
    })

    res.status(201).send(ticket);
  }
);

export { router as createRouter };

