import { TicketsCreateDTO } from '@app2/common';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../app';

export const signin = () => {
  const jwtPayload = {
    id: '1',
    email: 'test@gmail.com',
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString('base64');

  return `session=${base64}`;
}

export const createTicket = async ({ title, price }: TicketsCreateDTO) => {
  const response = await request(app).post('/api/tickets')
    .set('Cookie', signin())
    .send({ title, price })
    .expect(201);

  return response.body;
}