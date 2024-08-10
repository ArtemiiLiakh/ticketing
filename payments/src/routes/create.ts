import { AuthHandler, PaymentsCreateDTO, validateRequest, Body, AuthRequest, NoEnityWithIdException, ForbiddenException, OrderStatus, BadBodyException, NATSPublisher, natsClient, Channels, PaymentCreatedEvent } from '@app2/common';
import express, { Response } from 'express'
import { Orders } from '../models/orders';
import { stripe } from '../stripe';
import { Payments } from '../models/payments';

const createRouter = express.Router();

createRouter.post('/', 
  AuthHandler,
  validateRequest({
    body: PaymentsCreateDTO,
  }),
  async (req: AuthRequest & Body<PaymentsCreateDTO>, res: Response) => {
    const order = await Orders.findById(req.body.orderId);
    
    if (!order) {
      throw new NoEnityWithIdException('Order');
    }

    if (order.userId !== req.user!.id) {
      throw new ForbiddenException();
    }

    if (order.status === OrderStatus.CANCELLED) {
      throw new BadBodyException('Order is cancelled');
    }

    if (order.status === OrderStatus.COMPLETE) {
      throw new BadBodyException('Order is completed');
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.price*100,
      currency: 'usd',
      payment_method_types: req.body.payment_method_types,
    }, {
      idempotencyKey: req.body.idempotencyKey,
    });

    const payment = Payments.build({
      orderId: order.id,
      stripeId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });

    order.set({
      status: OrderStatus.PENDING,
    });

    await order.save();
    await payment.save();

    await new NATSPublisher(natsClient.client).publish<PaymentCreatedEvent>(Channels.PAYMENT_CREATED, {
      id: payment.id,
      orderId: order.id,
      stripeId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });

    res.status(200).send({
      paymentId: paymentIntent.id,
      client_secret: paymentIntent.client_secret,
    });
  }
);

export { createRouter };