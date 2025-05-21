import { PaymentsCreateDTO } from '@app2/common/dtos';
import { AuthHandler } from "@app2/common/middlewares";
import { AuthRequest, Body } from "@app2/common/types";
import { validateRequest } from "@app2/common/utils";
import { PaymentComponentDI } from '@components/di/PaymentComponentDI';
import express, { Response } from 'express';

const createRouter = express.Router();

createRouter.post('/', 
  AuthHandler,
  validateRequest({
    body: PaymentsCreateDTO,
  }),
  async ({ body }: AuthRequest & Body<PaymentsCreateDTO>, res: Response) => {
    const paymentDetails = await PaymentComponentDI.create({
      executorId: body.user.id,
      orderId: body.orderId,
      payment_method_types: body.payment_method_types,
      idempotencyKey: body.idempotencyKey,
    })

    res.status(200).send({
      orderId: paymentDetails.orderId,
      client_secret: paymentDetails.payment_service_details.client_secret,
    });
  }
);

export { createRouter };
