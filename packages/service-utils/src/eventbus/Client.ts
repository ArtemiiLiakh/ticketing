import { Channels } from './Channels';
import { EventBusListener } from './Listener';

export interface EventBusClient<TConfig=unknown> {
  listen<TData>(listener: EventBusListener<TData>): void;
  publish<TData>(channel: Channels, data: TData): Promise<void>;
  connect(config: TConfig): Promise<void>;
}