import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
import { TicketAttrs, TicketDocument, Tickets } from '../models/tickets';
import mongoose from 'mongoose';

export const signin = (userId: string = new mongoose.Types.ObjectId().toHexString()) => {
  const jwtPayload = {
    id: userId,
    email: 'test@gmail.com',
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString('base64');

  return `session=${base64}`;
}

export const createOrder = async (userId: string, ticket: TicketDocument) => {
  const order = await request(app).post('/api/orders')
    .set('Cookie', signin(userId))
    .send({ ticketId: ticket.id })
    .expect(201);

  return order.body;
}

export const createTicket = async (attrs: TicketAttrs) => {
  const ticket = Tickets.build(attrs);
  await ticket.save();
  return ticket;
}