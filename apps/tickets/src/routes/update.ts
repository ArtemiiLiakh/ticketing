import { TicketsUpdateDTO } from '@app2/common/dtos';
import { AuthHandler } from '@app2/common/middlewares';
import { AuthRequest, Body, Params } from '@app2/common/types';
import { validateRequest } from '@app2/common/utils';
import { TicketComponentDI } from '@components/di/TicketComponentDI';
import express, { Response } from 'express';

const router = express.Router();

router.patch('/:ticketId', 
  AuthHandler,
  validateRequest({
    body: TicketsUpdateDTO,
  }), 
  async ({ params, body }: AuthRequest & Params<{ ticketId: string }> & Body<TicketsUpdateDTO>, res: Response) => {
    await TicketComponentDI.update({
      id: params.ticketId,
      title: body.title,
      price: body.price,
    });
    
    res.send({
      message: 'OK'
    });
});

export { router as updateRouter };
