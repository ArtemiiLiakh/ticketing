import { Stan, Message } from "node-nats-streaming";
import { Channels } from "./Channels";
import { QueueGroups } from "./QueueGroups";

export abstract class NATSListener<D=any> {
  abstract channel: Channels;
  abstract queueGroupName: QueueGroups;

  protected client: Stan;
  protected ackWait = 10 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  abstract onMessage(data: D, msg: Message): void;

  subscriptionOptions() {
    return this.client.subscriptionOptions()
      .setDeliverAllAvailable()
      .setDurableName(this.queueGroupName)
      .setManualAckMode(true)
      .setAckWait(this.ackWait);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.channel,
      this.queueGroupName,
      this.subscriptionOptions(),
    );

    subscription.on('message', (msg: Message) => {
      console.log(`Message received #${msg.getSequence()} ${this.channel} / ${this.queueGroupName}`);

      const data = msg.getData();
      if (typeof data === 'string') {
        this.onMessage(JSON.parse(data), msg);
      } else {
        this.onMessage(JSON.parse(data.toString()), msg);
      }
    });
  }
}