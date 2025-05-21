import { AsyncHandler } from '@app2/common/types';
import { TicketRepository } from '@components/repository/TicketRepository';
import { GetTicketByIdDTO } from './GetTicketByIdDTO';
import { GetTicketByIdResponse } from './GetTicketByResponse';
import { NoEnityWithIdException } from '@app2/common/exceptions';

export class GetTicketByIdHandler implements AsyncHandler<GetTicketByIdDTO, GetTicketByIdResponse> {
  constructor (
    private readonly ticketRepository: TicketRepository,
  ) {}

  async handle ({ id }: GetTicketByIdDTO): Promise<GetTicketByIdResponse> {
    const ticket = await this.ticketRepository.getById(id);
    
    if (!ticket) {
      throw new NoEnityWithIdException('Ticket');
    }

    return ticket;
  }
}