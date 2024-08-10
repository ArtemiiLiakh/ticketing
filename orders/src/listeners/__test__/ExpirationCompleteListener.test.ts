import { ExpirationCompleteEvent, natsClient, OrderCancelledEvent, OrderStatus } from "@app2/common";
import { ExpirationCompleteListener } from "../ExpirationCompleteListener";
import { createOrder, createTicket } from "../../test/utils";
import { Message } from "node-nats-streaming";
import { Orders } from "../../models/orders";

describe('Test listener on completed order expiration', () => {
  it('updated order status to cancelled', async () => {
    const listener = new ExpirationCompleteListener(natsClient.client);
    
    const userId = 'user';
    const ticket = await createTicket({
      title: 'ticket',
      price: 100,
      userId
    });
    const order = await createOrder(userId, ticket);
    expect(order.status).toEqual(OrderStatus.CREATED);

    const data: ExpirationCompleteEvent = {
      orderId: order._id,
    };

    // @ts-ignore
    const msg: Message = {
      ack: jest.fn(),
    }
    
    await listener.onMessage(data, msg);

    const cancelledOrder = await Orders.findById(order._id);
    expect(cancelledOrder!.status).toEqual(OrderStatus.CANCELLED);
    expect(msg.ack).toHaveBeenCalled();
  });

  it('emit OrderCancelled evetn', async () => {
    const listener = new ExpirationCompleteListener(natsClient.client);
    
    const userId = 'user';
    const ticket = await createTicket({
      title: 'ticket',
      price: 100,
      userId
    });
    const order = await createOrder(userId, ticket);
    expect(order.status).toEqual(OrderStatus.CREATED);

    const data: ExpirationCompleteEvent = {
      orderId: order._id,
    };

    // @ts-ignore
    const msg: Message = {
      ack: jest.fn(),
    }
    
    await listener.onMessage(data, msg);
    expect(natsClient.client.publish).toHaveBeenCalled();

    const eventData: OrderCancelledEvent = JSON.parse((natsClient.client.publish as jest.Mock).mock.calls[0][1]);
    expect(eventData.id).toEqual(order._id);
  });
});