import { ICommand } from '../abstractions/ICommand';

export class PurchaseCommand implements ICommand {
  readonly type = 'command';

  constructor (
    readonly ticketId: string,
  ) {}
}