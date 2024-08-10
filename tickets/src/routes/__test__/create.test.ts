import request from 'supertest';
import app from '../../app';
import { createTicket, signin } from '../../test/utils';
import { Tickets } from '../../models/tickets';
import { natsClient } from '@app2/common';

describe('Test /tickets/create route', () => {
  it ('returns a 401 because user is unauthorized', async () => {
    await request(app)
      .post('/api/tickets')
      .send({})
      .expect(401);
  });

  it('returns a 201 and creates a ticket', async () => {
    await request(app).post('/api/tickets')
      .set('Cookie', signin())
      .send({
        title: 'Test Title',
        price: 20,
      })
      .expect(201);
      
    expect(natsClient.client.publish).toHaveBeenCalled();

    const tickets = await Tickets.find();
    expect(tickets).toBeDefined();
    expect(tickets.length).toEqual(1);
    expect(tickets[0]).toMatchObject({
      title: 'Test Title',
      price: 20,
    });
  });

  it('publish events', async () => {
    await createTicket({
      title: 'Test Title',
      price: 20,
    });

    expect(natsClient.client.publish).toHaveBeenCalled();
  });

  it('returns 400 because of invalid title', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', signin())
      .send({
        price: 20,
      })
      .expect(400);
  });

  it('returns 400 because of invalid price', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', signin())
      .send({
        title: 'Test Title',
        price: -20,
      })
      .expect(400);
  });
});