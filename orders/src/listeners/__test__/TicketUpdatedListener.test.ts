import { natsClient, TicketUpdatedEvent } from "@app2/common";
import { TicketUpdatedListener } from "../TicketUpdatedListener";
import { Tickets } from "../../models/tickets";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

describe('Test listener on ticket updated', () => {
  it('updates a ticket', async () => {
    const listener = new TicketUpdatedListener(natsClient.client);

    const ticket = Tickets.build({
      title: 'title',
      price: 10,
      userId: new mongoose.Types.ObjectId().toHexString(),
    });

    await ticket.save();

    const data: TicketUpdatedEvent = {
      id: ticket.id,
      title: 'other title',
      price: 20,
      userId: ticket.userId,
      version: ticket.version+1,
    };

    // @ts-ignore
    const msg: Message = {
      ack: jest.fn(),
    };

    await listener.onMessage(data, msg);
    
    const updatedTicket = await Tickets.findById(ticket.id);
    expect(updatedTicket).toBeDefined();
    expect(updatedTicket).toMatchObject(data);
    expect(msg.ack).toHaveBeenCalled();
  });

  it('do not ack message because of incorrect version', async () => {
    const listener = new TicketUpdatedListener(natsClient.client);

    const ticket = Tickets.build({
      title: 'title',
      price: 10,
      userId: new mongoose.Types.ObjectId().toHexString(),
    });

    await ticket.save();

    const data: TicketUpdatedEvent = {
      id: ticket.id,
      title: 'other title',
      price: 20,
      userId: ticket.userId,
      version: ticket.version+2,
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