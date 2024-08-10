import { natsClient, OrderCreatedEvent, OrderStatus } from "@app2/common";
import { OrderCreatedListener } from "../OrderCreatedListener";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Orders } from "../../models/orders";

describe('Test listener on order creation', () => {
  it('creates and saves order', async () => {
    const listener = new OrderCreatedListener(natsClient.client);

    const data: OrderCreatedEvent = {
      id: new mongoose.Types.ObjectId().toHexString(),
      userId: 'userId',
      status: OrderStatus.CREATED,
      expiresAt: new Date().getTime(),
      version: 0,
      ticket: {
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 10,
      },
    };

    // @ts-ignore
    const msg: Message = {
      ack: jest.fn(),
    };

    await listener.onMessage(data, msg);

    const order = await Orders.findById(data.id);
    expect(order).toBeDefined();
    expect(order!.price).toEqual(data.ticket.price);
    expect(msg.ack).toHaveBeenCalled();
  });
});