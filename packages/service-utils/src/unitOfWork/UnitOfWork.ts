import { TransactionalRepository } from './TransactionalRepository';

type ObjectValues<T> = {
  [K in string]: T
}

type UnitCallback<TRepositories, TReturn> = (unit: TRepositories) => TReturn | null;

export interface IUnitOfWork<TRepositories extends ObjectValues<TransactionalRepository>> {
  execute<TReturn>(fn: UnitCallback<TRepositories, TReturn>)
}