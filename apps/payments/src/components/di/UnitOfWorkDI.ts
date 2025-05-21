import { OrderRepository } from '@components/repositories/OrderRepository';
import { PaymentRepository } from '@components/repositories/PaymentRepository';
import { UnitOfWork } from '@components/repositories/UnitOfWork';

export const UnitOfWorkDI = new UnitOfWork(
  () => new PaymentRepository(),
  () => new OrderRepository(),
);