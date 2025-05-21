import { EventEmitter } from 'events';
import { ICommand } from '../abstractions/ICommand';
import { ICommandHandler } from '../abstractions/ICommandHandler';
import { Result } from '@app2/common/responses';

export class CommandHandlerProxy implements ICommandHandler<ICommand> {
  constructor (
    private readonly commandHandler: ICommandHandler<ICommand>,
    private readonly eventBus: EventEmitter,
  ) {}
  
  handle(command: ICommand): Result | Promise<Result> {
    this.eventBus.emit('command', command);
    return this.commandHandler.handle(command);
  }
}