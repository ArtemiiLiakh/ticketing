import Queue from 'bull';
import config from '../../config';
import { BullMessageQueue } from '../impl/BullMessageQueue';
import { OrderExpiredPayload } from '../payloads/OrderExpiredPayload';

const queue = new Queue('order-expiration', config.REDIS_URI);

export const OrderExpiredQueue = new BullMessageQueue<OrderExpiredPayload>(queue);