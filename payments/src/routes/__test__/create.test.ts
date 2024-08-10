import supertest from "supertest";
import app from "../../app";
import { signin } from "../../test/utils";
import mongoose from "mongoose";
import { Orders } from "../../models/orders";
import { OrderStatus } from "@app2/common";
import { stripe } from "../../stripe";
import Stripe from "stripe";

describe('Test payment creation', () => {
  it('return 401: user unauthorized', async () => {
    const response = await supertest(app)
      .post('/api/payments')
      .expect(401);

    expect(response.body.error).toEqual('UnauthorizedException');
  });

  it('return 404: purchase nonexistense order', async () => {
    const orderId = new mongoose.Types.ObjectId().toHexString();

    const response = await supertest(app)
      .post('/api/payments')
      .set('Cookie', signin())
      .send({ 
        orderId,
        payment_method: 'pm_card_visa',
       })
      .expect(404)

    expect(response.body.error).toEqual('NoEnityWithIdException');
  });

  it('return 403: user with wrong id try to purchase', async () => {
    const order = Orders.build({
      userId: 'user1',
      price: 10,
      status: OrderStatus.CREATED,
    });

    await order.save();

    const response = await supertest(app)
      .post('/api/payments')
      .set('Cookie', signin('user2'))
      .send({ 
        orderId: order.id,
        payment_method: 'pm_card_visa',
      })
      .expect(403)

    expect(response.body.error).toEqual('ForbiddenException');
  });

  it('return 400: try to execute cancelled order', async () => {
    const user = 'userId';

    const order = Orders.build({
      userId: user,
      price: 10,
      status: OrderStatus.CANCELLED,
    });

    await order.save();

    const response = await supertest(app)
      .post('/api/payments')
      .set('Cookie', signin(user))
      .send({ 
        orderId: order.id,
        payment_method: 'pm_card_visa',
      })
      .expect(400)

    expect(response.body.error).toEqual('BadBodyException');
  });

  it('return 204: creates a purchase order', async () => {
    stripe.paymentIntents.create = jest.fn().mockImplementation(
      (params: Stripe.PaymentIntentCreateParams, options?: Stripe.RequestOptions) => {}
    );

    const user = 'userId';

    const order = Orders.build({
      userId: user,
      price: 10,
      status: OrderStatus.CREATED,
    });

    await order.save();

    await supertest(app)
      .post('/api/payments')
      .set('Cookie', signin(user))
      .send({ 
        orderId: order.id,
        payment_method: 'pm_card_visa',
      }).expect(204);
    
    expect(stripe.paymentIntents.create).toHaveBeenCalled();
    
    const payment = (stripe.paymentIntents.create as jest.Mock).mock.calls[0][0] as Stripe.PaymentIntentCreateParams;
    expect(payment.currency).toEqual('usd');
    expect(payment.payment_method).toEqual('pm_card_visa');
    expect(payment.amount).toEqual(order.price*100);
  });
});