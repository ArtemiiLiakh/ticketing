import request from 'supertest';
import app from "../../app";
import { createOrder, createTicket, signin } from '../../test/utils';
import mongoose from 'mongoose';
import { OrderStatus, natsClient } from '@app2/common';

describe('Test canceling orders on /orders/:orderId/cancel', () => {
  it('401 user unauthorized', async () => {
    const response = await request(app)
      .patch ('/api/orders/orderId/cancel')
      .expect(401);

    expect(response.body.error).toEqual('UnauthorizedException');
  });

  it('404 order with id not found', async () => {
    const orderId = new mongoose.Types.ObjectId();
    const response = await request(app)
      .patch(`/api/orders/${orderId}/cancel`)
      .set('Cookie', signin('userId'))
      .expect(404);

    expect(response.body.error).toEqual('NoEnityWithIdException');
  });

  it('403 cannot cancel order', async () => {
    const ticket = await createTicket({
      title: 'New ticket',
      price: 10,
      userId: 'userId',
    });

    const order = await createOrder('user1', ticket);
    const response = await request(app)
      .patch(`/api/orders/${order._id}/cancel`)
      .set('Cookie', signin('user2'))
      .expect(403);
    
    expect(response.body.error).toEqual('ForbiddenException');
  });

  it('200 succesfully cancel order', async () => {
    const ticket = await createTicket({
      title: 'New ticket',
      price: 10,
      userId: 'userId',
    });

    const userId = 'userId';
    const order = await createOrder(userId, ticket);
    const response = await request(app)
      .patch(`/api/orders/${order._id}/cancel`)
      .set('Cookie', signin(userId))
      .expect(200);
    
    expect(response.body._id).toEqual(order._id);
    expect(response.body.status).toEqual(OrderStatus.CANCELLED);
  });

  it('publish event', async () => {
    const ticket = await createTicket({
      title: 'New ticket',
      price: 10,
      userId: 'userId',
    });

    const userId = 'userId';
    const order = await createOrder(userId, ticket);
    await request(app)
      .patch(`/api/orders/${order._id}/cancel`)
      .set('Cookie', signin(userId))
      .expect(200);
    
    expect(natsClient.client.publish).toHaveBeenCalled();
  });
});