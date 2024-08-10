import { AuthHandler, AuthRequest, BadBodyException, Body, Channels, natsClient, NATSPublisher, NoEnityWithIdException, OrderStatus, PaymentCompletedEvent, PaymentCreatedEvent, PaymentsCompleteDTO, validateRequest } from '@app2/common';
import express, { Response } from 'express';
import { Orders } from '../models/orders';
import { Payments } from '../models/payments';

const completeRouter = express.Router();

completeRouter.patch('/complete', 
  AuthHandler,
  validateRequest({
    body: PaymentsCompleteDTO,
  }),
  async (req: AuthRequest & Body<PaymentsCompleteDTO>, res: Response) => {
    const order = await Orders.findById(req.body.orderId);
    const payment = await Payments.findById(req.body.paymentId);

    if (!order) {
      throw new NoEnityWithIdException('Order');
    }

    if (!payment) {
      throw new BadBodyException('Order does not have payment');
    }

    order.set({
      status: OrderStatus.COMPLETE,
    });

    await order.save();
    
    await new NATSPublisher(natsClient.client).publish<PaymentCompletedEvent>(Channels.PAYMENT_CREATED, {
      orderId: order.id,
      paymentId: payment.id,
    });

    res.status(204).send();
  }
);

export { completeRouter };