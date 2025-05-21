import { OrderCancelledListenerDI, OrderCreatedListenerDI } from '@components/di/EventListeners';
import config from '@config/index';
import { NATSEventBusDI } from '@di/EventBusDI';
import { randomBytes } from 'crypto';

export const connectNats = async (): Promise<void> => {
  await NATSEventBusDI.connect({
    clusterId: 'test-cluster',
    clientId: randomBytes(4).toString('hex'),
    opts: {
      url: config.NATS_URL,
    }
  }).then(() => {
    NATSEventBusDI.listen(OrderCancelledListenerDI);
    NATSEventBusDI.listen(OrderCreatedListenerDI);
    console.log('Connected to NATs')
  }, (err) => {
    console.log('NATS error');
    console.log(err);
  });
}