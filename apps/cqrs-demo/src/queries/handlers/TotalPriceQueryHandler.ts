import { Result } from '@app2/common/responses';
import { IQueryHandler } from '../../abstractions/IQueryHandler';
import { TicketStorage } from '../../storage';
import { TotalPriceQuery } from '../TotalPriceQuery';

export class TotalPriceQueryHandler implements IQueryHandler<TotalPriceQuery, number> {
  constructor (
    private readonly storage: TicketStorage
  ) {}

  handle (query: TotalPriceQuery): Result<number> {
    let total = 0;
    const tickets = this.storage.getAll();

    for (const ticket of tickets) {
      total += ticket.price;
    }
    
    return Result.create(total);
  }
}