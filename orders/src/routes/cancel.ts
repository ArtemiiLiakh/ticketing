import { 
  AuthHandler,
  AuthRequest,
  Channels,
  ForbiddenException, 
  NATSPublisher, 
  NoEnityWithIdException, 
  OrderCancelledEvent, 
  OrderStatus, 
  Params, 
  natsClient 
} from '@app2/common';
import express, { Response } from 'express';
import { Orders } from '../models/orders';

const router = express.Router();

router.patch(
  '/:orderId/cancel', 
  AuthHandler,
  async ({ params, user }: AuthRequest & Params<{ orderId: string }>, res: Response) => {
    const order = await Orders.findById(params.orderId).populate('ticket');

    if (!order) {
      throw new NoEnityWithIdException('Order');
    }

    if (order.userId !== user!.id) {
      throw new ForbiddenException('You cannot cancel the order');
    }

    order.status = OrderStatus.CANCELLED;
    await order.save();
    await new NATSPublisher(natsClient.client).publish<OrderCancelledEvent>(
      Channels.ORDER_CANCELLED,
      {
        id: order.id,
        ticket: {
          id: order.ticket.id,
        },
        version: order.version,
      },
    );
        
    res.send(order);
  }
);

export { router as cancelRouter };