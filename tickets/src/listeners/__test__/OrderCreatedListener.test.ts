import { natsClient, OrderCreatedEvent, OrderStatus } from "@app2/common";
import { OrderCreatedListener } from "../OrderCreatedListener";
import { Tickets } from "../../models/tickets";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

describe('Test listener on order created', () => {
  it('successfully updates ticket and sets order id', async () => {
    const ticket = Tickets.build({
      title: 'title',
      price: 10,
      userId: new mongoose.Types.ObjectId().toHexString(),
    });

    await ticket.save();
    
    const data: OrderCreatedEvent = {
      id: new mongoose.Types.ObjectId().toHexString(),
      userId: new mongoose.Types.ObjectId().toHexString(),
      status: OrderStatus.CREATED,
      expiresAt: new Date().getTime(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
      version: 0,
    };

    // @ts-ignore
    const msg: Message = {
      ack: jest.fn(),
    };

    const listener = new OrderCreatedListener(natsClient.client);
    await listener.onMessage(data, msg);

    const updatedTicket = await Tickets.findById(ticket.id);
    expect(updatedTicket!.orderId).toEqual(data.id);
    expect(msg.ack).toHaveBeenCalled();
  });

  it('publish event on updated ticket', async () => {
    const ticket = Tickets.build({
      title: 'title',
      price: 10,
      userId: new mongoose.Types.ObjectId().toHexString(),
    });

    await ticket.save();
    
    const data: OrderCreatedEvent = {
      id: new mongoose.Types.ObjectId().toHexString(),
      userId: new mongoose.Types.ObjectId().toHexString(),
      status: OrderStatus.CREATED,
      expiresAt: new Date().getTime(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
      version: 0,
    };

    // @ts-ignore
    const msg: Message = {
      ack: jest.fn(),
    };

    const listener = new OrderCreatedListener(natsClient.client);
    await listener.onMessage(data, msg);
    expect(natsClient.client.publish).toHaveBeenCalled();
    
    const ticketUpdatedData = JSON.parse((natsClient.client.publish as jest.Mock).mock.calls[0][1]);
    expect(ticketUpdatedData.orderId).toEqual(data.id);
  });
});