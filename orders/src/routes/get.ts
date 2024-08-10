import { AuthHandler, AuthRequest, BadBodyException, ForbiddenException, NoEnityWithIdException, Params } from '@app2/common';
import express, { Response } from 'express';
import { Orders } from '../models/orders';

const router = express.Router();

router.get('/', 
  AuthHandler,
  async (req: AuthRequest, res: Response) => {
    const orders = await Orders.find({
      userId: req.user!.id,
    }).populate('ticket');

    res.send(orders);
  },
);

router.get('/:orderId', 
  AuthHandler,
  async (req: AuthRequest & Params<{ orderId: string }>, res: Response) => {
    const order = await Orders.findById(req.params.orderId).populate('ticket');

    if (!order) {
      throw new NoEnityWithIdException('Order');
    }

    if (order.userId !== req.user!.id) {
      throw new ForbiddenException('You cannot get information for this order');
    }

    res.send(order);
  },
);

export { router as getRouter }