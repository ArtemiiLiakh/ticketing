import nats, { Message } from "node-nats-streaming";
import { Channels } from '../Channels';
import { EventBusClient } from '../Client';
import { EventBusListener } from '../Listener';

interface NATSConfig {
  clusterId: string, 
  clientId: string, 
  opts: nats.StanOptions,
}

export class NATSClient implements EventBusClient<NATSConfig> {
  private client: nats.Stan;
  protected ackWait = 10 * 1000;
  
  publish<TData>(channel: Channels, data: TData): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(channel, JSON.stringify(data), (err) => {
        if (err) {  
          return reject(err);
        } else {
          console.log(`${channel} | Event published:`, data);
          resolve();
        }
      });
    });
  }

  listen<TData>(listener: EventBusListener<TData>): void {
    const options = this.client.subscriptionOptions()
      .setDeliverAllAvailable()
      .setDurableName(listener.queueGroup)
      .setManualAckMode(true)
      .setAckWait(this.ackWait);

    const subscription = this.client.subscribe(
      listener.channel,
      listener.queueGroup,
      options,
    );

    subscription.on('message', (msg: Message) => {
      console.log(`Message received #${msg.getSequence()} ${listener.channel} / ${listener.queueGroup}`);

      const data = JSON.parse(msg.getData().toString());

      listener.onMessage(data, {
        ack: msg.ack.bind(msg),
      });
    });
  }

  connect ({ clientId, clusterId, opts }: NATSConfig): Promise<void> {
    this.client = nats.connect(clusterId, clientId, opts);

    this.client.on('close', () => {
      console.log('NATS connection closed');
      process.exit();
    });

    process.on('SIGINT', () => this.client.close());
    process.on('SIGTERM', () => this.client.close());

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });
      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }  
}