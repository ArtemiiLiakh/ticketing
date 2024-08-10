import request from 'supertest';
import app from '../../app';
import { createOrder, createTicket, signin } from '../../test/utils';
import mongoose from 'mongoose';

describe('Test getting orders from /orders', () => {
  it('401 user is unauthorized', async () => {
    const response = await request(app)
      .get('/api/orders')
      .expect(401);

    expect(response.body.error).toEqual('UnauthorizedException');
  });

  it('200 return only list of user\'s orders', async () => {
    const user1 = 'user1';
    const user2 = 'user2';

    const ticket1 = await createTicket({
      title: 'New ticket',
      price: 10,
      userId: 'userId',
    });
    const ticket2 = await createTicket({
      title: 'New ticket',
      price: 10,
      userId: 'userId',
    });

    const order1 = await createOrder(user1, ticket1);
    const order2 = await createOrder(user2, ticket2);

    const response1 = await request(app).get('/api/orders')
      .set('Cookie', signin(user1))
      .expect(200);
    
    const response2 = await request(app).get('/api/orders')
      .set('Cookie', signin(user2))
      .expect(200);
    
    expect(response1.body.length).toEqual(1);
    expect(response1.body[0]).toEqual(order1);

    expect(response2.body.length).toEqual(1);
    expect(response2.body[0]).toEqual(order2);

    expect(response1.body[0].ticket).not.toEqual(response2.body[0].ticket);
  });

  it('200 return list of user\'s orders', async () => {
    const userId = 'userId';
    const ticket = await createTicket({
      title: 'New ticket',
      price: 10,
      userId: 'userId',
    });

    const order = await createOrder(userId, ticket);
    const response = await request(app).get('/api/orders')
      .set('Cookie', signin(userId))
      .expect(200);

    expect(response.body[0]).toEqual(order);
  });
});

describe('Test getting order from /orders/:orderId', () => {
  it('401 user unauthorized', async () => {
    const response = await request(app)
      .get('/api/orders/orderId')
      .expect(401);

    expect(response.body.error).toEqual('UnauthorizedException');
  });

  it('200 get user\'s order', async () => {
    const ticket = await createTicket({
      title: 'New ticket',
      price: 10,
      userId: 'userId',
    });

    const userId = 'userId';
    const order = await createOrder(userId, ticket);
    const response = await request(app)
      .get(`/api/orders/${order._id}`)
      .set('Cookie', signin(userId))
      .expect(200);

    expect(response.body).toEqual(order);
  });

  it('404 order with id not found', async () => {
    const orderId = new mongoose.Types.ObjectId();
    const response = await request(app)
      .get(`/api/orders/${orderId}`)
      .set('Cookie', signin('user'))
      .expect(404);
    
    expect(response.body.error).toEqual('NoEnityWithIdException');
  });

  it('403 order for user wasn\'t found', async () => {
    const ticket = await createTicket({
      title: 'New ticket',
      price: 10,
      userId: 'userId',
    });
    
    const user1 = 'user1';
    const user2 = 'user2';
    const order = await createOrder(user1, ticket);
    const response = await request(app)
      .get(`/api/orders/${order._id}`)
      .set('Cookie', signin(user2))
      .expect(403);
    
    expect(response.body.error).toEqual('ForbiddenException');
  });
});