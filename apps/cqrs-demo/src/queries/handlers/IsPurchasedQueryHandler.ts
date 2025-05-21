import { Result } from '@app2/common/responses';
import { IQueryHandler } from '../../abstractions/IQueryHandler';
import { TicketStorage } from '../../storage';
import { IsPurchasedQuery } from '../IsPurchasedQuery';

export class IsPurchasedQueryHandler implements IQueryHandler<IsPurchasedQuery, boolean> {
  constructor (
    private readonly storage: TicketStorage,
  ) {}
  
  handle (query: IsPurchasedQuery): Result<boolean> {
    const isPurchased = !!this.storage.getById(query.id)?.isPurchased
    return Result.create(isPurchased);
  }
}