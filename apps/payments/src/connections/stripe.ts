import config from '@config/index';
import Stripe from 'stripe';

export const stripeInstance = new Stripe(config.STRIPE_SECRET, {
  apiVersion: '2024-06-20',
});