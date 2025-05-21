import { randomBytes } from 'crypto';
import config from '../config';
import { NATSEventBusDI } from '../di/NATSEventBusDI';
import { OrderCreatedListenerDI } from '../di/OrderCreatedListenerDI';
import { PaymentCreatedListenerDI } from '../di/PaymentCreatedListenerDI';

export const connectNats = async (): Promise<void> => {
  await NATSEventBusDI.connect({
    clusterId: 'test-cluster',
    clientId: randomBytes(4).toString('hex'),
    opts: {
      url: config.NATS_URL
    },
  });

  NATSEventBusDI.listen(OrderCreatedListenerDI);
  NATSEventBusDI.listen(PaymentCreatedListenerDI);
}