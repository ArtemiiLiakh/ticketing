import { PaymentsCompleteDTO } from '@app2/common/dtos';
import { AuthHandler } from '@app2/common/middlewares';
import { AuthRequest, Body } from '@app2/common/types';
import { validateRequest } from '@app2/common/utils';
import { PaymentComponentDI } from '@components/di/PaymentComponentDI';
import express, { Response } from 'express';

const completeRouter = express.Router();

completeRouter.patch('/complete', 
  AuthHandler,
  validateRequest({
    body: PaymentsCompleteDTO,
  }),
  async ({ body }: AuthRequest & Body<PaymentsCompleteDTO>, res: Response) => {
    await PaymentComponentDI.complete({
      executorId: body.user.id,
      orderId: body.orderId,
    });

    res.status(204).send();
  }
);

export { completeRouter };
