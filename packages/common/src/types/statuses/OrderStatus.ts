import { ValueOf } from '../../utils/ValueOf';

export const OrderStatus = {
  CREATED: 'CREATED',
  CANCELLED: 'CANCELLED',
  PENDING: 'PENDING',
  COMPLETE: 'COMPLETE'
} as const;

export type OrderStatus = ValueOf<typeof OrderStatus>;