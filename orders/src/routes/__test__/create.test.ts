import mongoose from "mongoose";
import request from 'supertest';
import app from "../../app";
import { createTicket, signin } from "../../test/utils";
import { Orders } from "../../models/orders";
import { Tickets } from "../../models/tickets";
import { OrderStatus, natsClient } from "@app2/common";

describe('Test creating orders on /orders route', () => {
  it('401 user unauthorized', async () => {
    const response = await request(app)
      .post('/api/orders')
      .expect(401);

    expect(response.body.error).toBe('UnauthorizedException');
  });

  it('404 because ticket with id not found', async () => {
    const ticketId = new mongoose.Types.ObjectId();
    const response = await request(app)
      .post('/api/orders')
      .set('Cookie', signin())
      .send({ ticketId })
      .expect(404);

    expect(response.body.error).toEqual('NoEnityWithIdException');
  });

  it('400 because ticket is reserved', async () => {
    const ticket = await createTicket({
      title: 'New ticket',
      price: 10,
      userId: 'userId',
    });

    const order = Orders.build({
      userId: 'userId',
      ticket,
      expiresAt: new Date(),
      status: OrderStatus.PENDING,
    });
    await order.save();

    const response = await request(app).post('/api/orders')
      .set('Cookie', signin('anotherUser'))
      .send({ ticketId: ticket.id })
      .expect(400);
    
    expect(response.body.error).toEqual('BadBodyException');
  });

  it('201 create a new order', async () => {
    const ticket = await createTicket({
      title: 'New ticket',
      price: 10,
      userId: 'userId',
    });

    const userId = 'userId';
    const order = await request(app).post('/api/orders')
      .set('Cookie', signin(userId))
      .send({ ticketId: ticket.id })
      .expect(201);
    
    expect(order.body.userId).toEqual(userId);
    expect(order.body.ticket._id).toEqual(ticket.id);
  });  

  it('publish events', async () => {
    const ticket = Tickets.build({
      title: 'New ticket',
      price: 10,
      userId: 'userId',
    });
    await ticket.save();

    await request(app).post('/api/orders')
      .set('Cookie', signin())
      .send({ ticketId: ticket.id })
      .expect(201);
    
    expect(natsClient.client.publish).toHaveBeenCalled();
  });
});