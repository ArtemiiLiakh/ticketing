import Stripe from 'stripe';
import { PaymentInstance, PaymentParams, PaymentService } from './PaymentService';

export class StripePaymentService implements PaymentService {
  constructor (
    private readonly stripe: Stripe,
  ) {}
  
  async create(params: PaymentParams): Promise<PaymentInstance> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: params.price*100,
      currency: params.currency,
      payment_method_types: params.payment_methods,
    }, {
      idempotencyKey: params.idempotencyKey,
    });

    if (!paymentIntent.client_secret) {
      throw new Error('No client secret token was provided when creating payment');
    }

    return {
      id: paymentIntent.id,
      client_secret: paymentIntent.client_secret,
    }
  }
}