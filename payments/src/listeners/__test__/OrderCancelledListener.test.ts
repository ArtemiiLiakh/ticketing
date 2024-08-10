import { natsClient, OrderCancelledEvent, OrderStatus } from "@app2/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Orders } from "../../models/orders";
import { OrderCancelledListener } from "../OrderCancelledListener";

describe('Test listener on order cancelled', () => {
  it('updates order status to cancelled', async () => {
    const order = Orders.build({
      userId: 'userId',
      price: 10,
      status: OrderStatus.CREATED,
    });

    await order.save()

    const listener = new OrderCancelledListener(natsClient.client);

    const data: OrderCancelledEvent = {
      id: order.id,
      ticket: {
        id: new mongoose.Types.ObjectId().toHexString(),
      },
      version: order.version+1,
    };

    // @ts-ignore
    const msg: Message = {
      ack: jest.fn(),
    };

    await listener.onMessage(data, msg);

    const cancelledOrder = await Orders.findById(order.id);
    expect(cancelledOrder).toBeDefined();
    expect(cancelledOrder!.status).toEqual(OrderStatus.CANCELLED);
    expect(cancelledOrder!.version).toEqual(data.version);
    expect(msg.ack).toHaveBeenCalled();
  });

  it('failed cancelling because of different version', async () => {
    const order = Orders.build({
      userId: 'userId',
      price: 10,
      status: OrderStatus.CREATED,
    });

    await order.save()

    const listener = new OrderCancelledListener(natsClient.client);

    const data: OrderCancelledEvent = {
      id: order.id,
      ticket: {
        id: new mongoose.Types.ObjectId().toHexString(),
      },
      version: order.version+2,
    };

    // @ts-ignore
    const msg: Message = {
      ack: jest.fn(),
    };

    const err = await listener.onMessage(data, msg).catch((err) => err); 
    expect(err).toBeDefined();
    expect(msg.ack).not.toHaveBeenCalled();
  });
});