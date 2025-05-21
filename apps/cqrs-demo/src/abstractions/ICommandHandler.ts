import { ICommand } from './ICommand';
import { Result } from '@app2/common/responses';

export interface ICommandHandler<TCommand extends ICommand, TResult=unknown> {
  handle(command: TCommand): Result<TResult> | Promise<Result<TResult>>;
}