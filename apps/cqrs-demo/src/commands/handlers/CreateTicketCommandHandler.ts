import { Result } from '@app2/common/responses';
import { ICommandHandler } from '../../abstractions/ICommandHandler';
import { TicketStorage } from '../../storage';
import { CreateTicketCommand } from '../CreateTicketCommand';

export class CreateTicketCommandHandler implements ICommandHandler<CreateTicketCommand, string> {
  constructor (
    private readonly storage: TicketStorage,
  ) {}
  
  handle (command: CreateTicketCommand): Result<string> {
    const id = this.storage.save(command.title, command.price);
    return Result.create(id);
  }
}