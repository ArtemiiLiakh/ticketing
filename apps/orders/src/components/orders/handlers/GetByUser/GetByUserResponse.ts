import { PaginationByPageResponse } from '@app2/common/types';
import { Order } from '@domain/Order';

export type GetByUserResponse = PaginationByPageResponse<Order>; 