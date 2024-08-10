import nats from "node-nats-streaming";

class NATSClient {
  private _client?: nats.Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, opts: nats.StanOptions) {
    this._client = nats.connect(clusterId, clientId, opts);

    this._client.on('close', () => {
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

export const natsClient = new NATSClient();
