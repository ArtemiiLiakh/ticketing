import request from 'supertest';
import app from '../../app';
import { createTicket, signin } from '../../test/utils';
import mongoose from 'mongoose';
import { Tickets } from '../../models/tickets';

describe('Test /tickets/update route', () => {
  it('returns a 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .patch(`/api/tickets/${id}`)
      .set('Cookie', signin())
      .send({
        title: 'Test Title',
        price: 20,
      })
      .expect(404);
  })

  it('returs 401 if the user is not authenticated', async () => {
    const ticket = await createTicket({
      title: 'Test Title',
      price: 20,
    });

    await request(app)
      .patch(`/api/tickets/${ticket._id}`)
      .send({
        title: 'Test Title',
        price: 20,
      })
      .expect(401);
  });

  it('returs 400 if data is not valid', async () => {
    const ticket = await createTicket({
      title: 'Test Title',
      price: 20,
    });

    await request(app)
      .patch(`/api/tickets/${ticket._id}`)
      .set('Cookie', signin())
      .send({
        price: 'test',
      })
      .expect(400);
  });

  it('returns 200 and updates a ticket', async () => {
    const ticket = await createTicket({
      title: 'Test Title',
      price: 20,
    });
    
    const updatedTicket = await request(app)
      .patch(`/api/tickets/${ticket._id}`)
      .set('Cookie', signin())
      .send({
        title: 'Updated Test Title',
        price: 30,
      })
      .expect(200)

    expect(updatedTicket).toBeDefined();
    expect(updatedTicket.body).toMatchObject({
      title: 'Updated Test Title',
      price: 30,
    });
  });

  it('returns 400 if ticket is reserved', async () => {
    const newTicket = await createTicket({
      title: 'Test Title',
      price: 20,
    });
    
    const ticket = await Tickets.findById(newTicket._id);
    ticket!.set({ orderId: 'orderId' });
    await ticket!.save();

    const response = await request(app)
      .patch(`/api/tickets/${ticket!._id}`)
      .set('Cookie', signin())
      .send({
        title: 'Updated Test Title',
        price: 30,
      })
      .expect(400);
    
    expect(response.body.error).toEqual('BadBodyException');
  });
})