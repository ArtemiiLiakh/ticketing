import { PaymentCreatedListener } from '../listeners/PaymentCreatedListener';
import { OrderExpiredQueue } from '../messageQueue/queues/OrderExpiredQueue';

export const PaymentCreatedListenerDI = new PaymentCreatedListener(OrderExpiredQueue); 