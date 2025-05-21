import { AuthHandler } from '@app2/common/middlewares';
import { AuthRequest, Params } from '@app2/common/types';
import { OrderComponentDI } from '@components/di/OrderComponentDI';
import express, { Response } from 'express';

const router = express.Router();

router.patch(
  '/:orderId/cancel', 
  AuthHandler,
  async ({ params, body: { user } }: AuthRequest & Params<{ orderId: string }>, res: Response) => {
    await OrderComponentDI.cancel({
      executorId: user.id,
      orderId: params.orderId
    });
        
    res.send({
      message: 'ok'
    });
  }
);

export { router as cancelRouter };
