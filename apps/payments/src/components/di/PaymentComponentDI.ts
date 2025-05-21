import { CompletePaymentHandler } from '@components/payments/handlers/Complete/ComletePaymentHandler';
import { CreatePaymentHandler } from '@components/payments/handlers/Create/CreatePaymentHandler';
import { PaymentComponent } from '@components/payments/PaymentComponent';
import { NATSEventBusDI } from '@di/EventBusDI';
import { OrderRepositoryDI } from './OrderRepositoryDI';
import { PaymentRepositoryDI } from './PaymentRepositoryDI';
import { PaymentServiceDI } from './StripePaymentServiceDI';
import { UnitOfWorkDI } from './UnitOfWorkDI';

export const PaymentComponentDI = new PaymentComponent(
  new CreatePaymentHandler(PaymentServiceDI, UnitOfWorkDI, NATSEventBusDI),
  new CompletePaymentHandler(OrderRepositoryDI, PaymentRepositoryDI, NATSEventBusDI),
);