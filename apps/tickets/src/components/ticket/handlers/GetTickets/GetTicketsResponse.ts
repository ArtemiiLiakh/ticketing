import { PaginationByCursorResponse } from '@app2/common/types';
import { Ticket } from "@domain/Ticket";

export interface GetTicketsResponse extends PaginationByCursorResponse<Ticket> {}