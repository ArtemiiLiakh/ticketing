import { ICommand } from '../abstractions/ICommand';

export class CreateTicketCommand implements ICommand {
  readonly type = 'command';

  constructor (
    readonly title: string,
    readonly price: number,
  ) {}
}