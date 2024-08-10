import { natsClient, TicketCreatedEvent } from "@app2/common";
import mongoose from "mongoose";
import { TicketCreatedListener } from "../TicketCreatedListener";
import { Message } from "node-nats-streaming";
import { Tickets } from "../../models/tickets";

describe('Test listener on ticket created', () => {
  it('creates and saves a ticket', async () => {
    const listener = new TicketCreatedListener(natsClient.client);
  
    const data: TicketCreatedEvent = {
      id: new mongoose.Types.ObjectId().toHexString(),
      version: 0,
      title: 'ticket',
      price: 10,
      userId: new mongoose.Types.ObjectId().toHexString(),
    };

    // @ts-ignore
    const msg: Message = {
      ack: jest.fn(),
    };

    await listener.onMessage(data, msg);

    const ticket = await Tickets.findById(data.id);
    expect(ticket).toBeDefined();
    expect(ticket).toMatchObject(data)
    expect(msg.ack).toHaveBeenCalled();
  });
});