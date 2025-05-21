import { IQuery } from '../abstractions/IQuery';

export class IsPurchasedQuery implements IQuery {
  readonly type = 'query';

  constructor (
    readonly id: string,
  ) {}
}
