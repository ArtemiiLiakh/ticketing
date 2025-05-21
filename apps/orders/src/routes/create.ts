import { OrdersCreateDTO } from '@app2/common/dtos';
import { AuthHandler } from '@app2/common/middlewares';
import { AuthRequest, Body, OrderStatus } from '@app2/common/types';
import { validateRequest } from '@app2/common/utils';
import { OrderComponentDI } from '@components/di/OrderComponentDI';
import express, { Response } from 'express';

const router = express.Router()

router.post(
  '/', 
  AuthHandler,
  validateRequest({
    body: OrdersCreateDTO,
  }),
  async ({ body: { ticketId, user } }: AuthRequest & Body<OrdersCreateDTO>, res: Response) => {
    const { id } = await OrderComponentDI.create({
      userId: user.id,
      ticketId,
      status: OrderStatus.CREATED,
    });

    res.status(201).send({
      id,
    });
  }
);

export { router as createRouter };
