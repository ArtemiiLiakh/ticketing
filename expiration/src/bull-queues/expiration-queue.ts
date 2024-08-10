import Queue from "bull";
import config from "../config";
import { natsClient, NATSPublisher, ExpirationCompleteEvent, Channels } from "@app2/common";

interface OrderPayload {
  orderId: string;
}

const expirationQueue = new Queue<OrderPayload>('order:expiration', config.REDIS_URI);

expirationQueue.process(async (job) => {
  await new NATSPublisher(natsClient.client).publish<ExpirationCompleteEvent>(Channels.EXPIRATION_COMPLETED, {
    orderId: job.data.orderId,
  });
});

export { expirationQueue };