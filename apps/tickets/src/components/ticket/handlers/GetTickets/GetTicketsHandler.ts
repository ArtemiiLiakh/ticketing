import { AsyncHandler } from "@app2/common/types";
import { decodeCursor, encodeCursor } from '@app2/common/utils';
import { TicketRepository } from '@components/repository/TicketRepository';
import { GetTicketsDTO } from "./GetTicketsDTO";
import { GetTicketsResponse } from './GetTicketsResponse';
import { CursorByDate } from './PaginationCursor/CursorByDate';

export class GetTicketsHandler implements AsyncHandler<GetTicketsDTO, GetTicketsResponse> {
  constructor (
    private readonly ticketRepository: TicketRepository,
  ) {}
  
  async handle ({ cursor, pageSize }: GetTicketsDTO): Promise<GetTicketsResponse> {
    const cursorPayload: CursorByDate | undefined = cursor ? decodeCursor(cursor) : undefined;

    const tickets = await this.ticketRepository.getMany(pageSize, cursorPayload);

    if (!tickets.length) {
      return {
        data: tickets,
        pagination: {
          cursor: '',
          hasNext: false,
        },
      };
    }

    let newCursor = '';

    if (tickets.length === pageSize) {
      newCursor = encodeCursor({
        lastDate: tickets.at(-1)!.createdAt,
        lastId: tickets.at(-1)!.id,
      } as CursorByDate);
    }

    return {
      data: tickets,
      pagination: {
        cursor: newCursor,
        hasNext: tickets.length === pageSize,
      },
    };
  } 
}
