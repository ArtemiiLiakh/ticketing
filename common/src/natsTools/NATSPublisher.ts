import { Stan } from "node-nats-streaming";
import { Channels } from "./Channels";

export class NATSPublisher {
  protected client: Stan;

  constructor (client: Stan) {
    this.client = client;
  }

  publish<D> (channel: Channels, data: D): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(channel, JSON.stringify(data), (err) => {
        if (err) {  
          return reject(err);
        } else {
          // console.log(`${channel} | Event published:`, data);
          resolve();
        }
      });
    });
  }
}