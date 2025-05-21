import { StripePaymentService } from '@components/services/StripePaymentService';
import { stripeInstance } from '@connections/stripe';

export const PaymentServiceDI = new StripePaymentService(stripeInstance);
