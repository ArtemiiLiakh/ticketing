import { OrderCancelledListenerDI, OrderCreatedListenerDI } from '@components/di/EventListeners';
import { NATSEventBusDI } from '@di/EventBusDI';
import { randomBytes } from 'crypto';
import config from '../config';

export const connectNats = async (): Promise<void> => {
  await NATSEventBusDI.connect({
    clusterId: 'test-cluster',
    clientId: randomBytes(4).toString('hex'),
    opts: {
      url: config.NATS_URL,
    },
  }).then(() => {
    NATSEventBusDI.listen(OrderCreatedListenerDI);
    NATSEventBusDI.listen(OrderCancelledListenerDI);
  }, (err) => {
    console.log('NATS error');
    console.log(err);
  });
};