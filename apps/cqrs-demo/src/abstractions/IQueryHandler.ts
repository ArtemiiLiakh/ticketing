import { Result } from '@app2/common/responses';
import { IQuery } from './IQuery';

export interface IQueryHandler<TQuery extends IQuery, TResult> {
  handle (query: TQuery): Result<TResult> | Promise<Result<TResult>>;
}