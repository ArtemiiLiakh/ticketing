import request from 'supertest';
import app from '../../app';
import { Tickets } from '../../models/tickets';
import { signin } from '../../test/utils';
import mongoose from 'mongoose';

describe('Test /tickets/get route', () => {
  it('returns a 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .get(`/api/tickets/${id}`)
      .send()
      .expect(404);
  })

  it('returns a 200 and gets all tickets', async () => {
    const ticket = await request(app)
      .post('/api/tickets')
      .set('Cookie', signin())
      .send({
        title: 'Test Title',
        price: 20,
      })
      .expect(201)
    
    const tickets = await request(app)
      .get(`/api/tickets/${ticket.body._id}`)
      .send()
      .expect(200)

    expect(tickets).toBeDefined();
    expect(tickets.body).toMatchObject({
      title: 'Test Title',
      price: 20,
    });
  });
});