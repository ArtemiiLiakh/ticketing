import { Result } from '@app2/common/responses';
import { ICommandHandler } from '../../abstractions/ICommandHandler';
import { TicketStorage } from '../../storage';
import { PurchaseCommand } from '../PurchaseCommand';

export class PurchaseCommandHandler implements ICommandHandler<PurchaseCommand> {
  constructor (
    private readonly storage: TicketStorage,
  ) {}

  handle (command: PurchaseCommand): Result {
    const ticket = this.storage.getById(command.ticketId);

    if (!ticket) {
      return Result.create(new Error('Ticket not found. <API side>'));
    }

    if (ticket.isPurchased) {
      return Result.create(new Error('Ticket is already purchased'));
    }

    this.storage.setPurchase(command.ticketId, true);
    return Result.empty();
  };
}