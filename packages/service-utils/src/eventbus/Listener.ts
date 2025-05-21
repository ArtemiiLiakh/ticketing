import { Channels } from './Channels';
import { QueueGroups } from './QueueGroups';

export interface EventMessage {
  ack: () => void;
}

export abstract class EventBusListener<TData=unknown> {
  abstract queueGroup: QueueGroups;
  abstract channel: Channels

  abstract onMessage(data: TData, msg: EventMessage): void | Promise<void>;
}