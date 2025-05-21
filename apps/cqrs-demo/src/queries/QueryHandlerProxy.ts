import { EventEmitter } from 'events';
import { IQuery } from '../abstractions/IQuery';
import { IQueryHandler } from '../abstractions/IQueryHandler';
import { Result } from '@app2/common/responses';

export class QueryHandlerProxy implements IQueryHandler<IQuery, unknown> {
  constructor (
    private readonly queryHandler: IQueryHandler<IQuery, unknown>,
    private readonly eventBus: EventEmitter,
  ) {}
  
  handle(command: IQuery): Result | Promise<Result> {
    this.eventBus.emit('query', command);
    return this.queryHandler.handle(command);
  }
}