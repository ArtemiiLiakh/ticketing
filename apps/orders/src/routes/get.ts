import { AuthHandler } from '@app2/common/middlewares';
import { AuthRequest, PaginationByPageDTO, Params, Query } from '@app2/common/types';
import { OrderComponentDI } from '@components/di/OrderComponentDI';
import express, { Response } from 'express';

const router = express.Router();

router.get('/', 
  AuthHandler,
  async ({ query, body: { user } }: AuthRequest & Query<PaginationByPageDTO>, res: Response) => {
    const orders = await OrderComponentDI.getByUser({
      userId: user.id,
      page: query.page,
      pageSize: query.pageSize,
    });

    res.send(orders);
  },
);

router.get('/:orderId', 
  AuthHandler,
  async ({ params, body: { user } }: AuthRequest & Params<{ orderId: string }>, res: Response) => {
    const order = await OrderComponentDI.getById({
      id: params.orderId,
      exeutorId: user.id,
    });

    res.send(order);
  },
);

export { router as getRouter };
