export interface OrderCancelledEvent {
  id: string;
  ticket: {
    id: string;
  };
  version: number;
}