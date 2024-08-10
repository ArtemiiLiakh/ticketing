import mongoose from "mongoose";
import { Tickets } from "../../models/tickets";
import { OrderCancelledListener } from "../OrderCancelledListener";
import { natsClient, OrderCancelledEvent } from "@app2/common";
import { Message } from "node-nats-streaming";

describe('Test listener on order cancelled', () => {
  it('successfully updates ticket and remove order id', async () => {
    const orderId = new mongoose.Types.ObjectId().toHexString();
    
    const ticket = Tickets.build({
      userId: new mongoose.Types.ObjectId().toHexString(),
      title: 'title',
      price: 10,
      orderId,
    });

    await ticket.save();

    const data: OrderCancelledEvent = {
      id: orderId,
      ticket: {
        id: ticket.id,
      },
      version: 1,
    };

    // @ts-ignore
    const msg: Message = {
      ack: jest.fn(),
    };

    const listener = new OrderCancelledListener(natsClient.client);
    await listener.onMessage(data, msg);
    
    const updatedTicket = await Tickets.findById(ticket.id);
    expect(updatedTicket!.orderId).not.toBeDefined();
    expect(natsClient.client.publish).toHaveBeenCalled();
    expect(msg.ack).toHaveBeenCalled();
  });
});