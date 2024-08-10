export enum Channels {
  TICKET_CREATED = 'ticket:created',
  TICKET_UPDATED = 'ticket:updated',

  ORDER_CREATED = 'order:created',
  ORDER_CANCELLED = 'order:cancelled',

  EXPIRATION_COMPLETED = 'expiration:completed',

  PAYMENT_CREATED = 'payment:created',
  PAYMENT_CONFIRMED = 'payment:completed',
}