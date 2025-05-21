import { Result } from '@app2/common/responses';
import EventEmitter from 'events';
import { CommandHandlerProxy } from './commands/CommandHandlerProxy';
import { CreateTicketCommand } from './commands/CreateTicketCommand';
import { CreateTicketCommandHandler } from './commands/handlers/CreateTicketCommandHandler';
import { PurchaseCommandHandler } from './commands/handlers/PurchaseCommandHandler';
import { PurchaseCommand } from './commands/PurchaseCommand';
import { EventStorage } from './eventStorage';
import { IsPurchasedQueryHandler } from './queries/handlers/IsPurchasedQueryHandler';
import { TotalPriceQueryHandler } from './queries/handlers/TotalPriceQueryHandler';
import { IsPurchasedQuery } from './queries/IsPurchasedQuery';
import { QueryHandlerProxy } from './queries/QueryHandlerProxy';
import { TotalPriceQuery } from './queries/TotalPriceQuery';
import { TicketStorage } from './storage';

const eventBus = new EventEmitter();
const storage = new TicketStorage();
const eventStorage = new EventStorage(eventBus);

const commands = {
  CreateTicket: new CommandHandlerProxy(new CreateTicketCommandHandler(storage), eventBus),
  Purchase: new CommandHandlerProxy(new PurchaseCommandHandler(storage), eventBus),
};

const queries = {
  TotalPrice: new QueryHandlerProxy(new TotalPriceQueryHandler(storage), eventBus),
  IsPurchased: new QueryHandlerProxy(new IsPurchasedQueryHandler(storage), eventBus),
};

class TicketingWriteAPI {
  addTicket (title: string, price: number): string {
    const command = new CreateTicketCommand(title, price);
    const result = commands.CreateTicket.handle(command) as Result<string>;
    return result.value;
  }

  purchase (id: string): void {
    const command = new PurchaseCommand(id);
    const result = commands.Purchase.handle(command) as Result;
    if (result.isFailure()) {
      console.log(result.value);
    }
  }
}

class TicketingReadAPI {
  totalPrice (): number {
    const query = new TotalPriceQuery();
    const result = queries.TotalPrice.handle(query) as Result<number>; 
    return result.value;
  }

  isPurchased(id: string): boolean {
    const query = new IsPurchasedQuery(id);
    const result = queries.IsPurchased.handle(query) as Result<boolean>;
    return result.value;
  }
}

const ticketingWrite = new TicketingWriteAPI();

const ticketingRead1 = new TicketingReadAPI();
const ticketingRead2 = new TicketingReadAPI();
const ticketingRead3 = new TicketingReadAPI();

const ticket1Id = ticketingWrite.addTicket('Ticket 1', 10);
const ticket2Id = ticketingWrite.addTicket('Ticket 2', 20);

ticketingWrite.purchase(ticket1Id);

console.log("Total price: ", ticketingRead1.totalPrice());
console.log("Is ticket 1 purchased: ", ticketingRead2.isPurchased(ticket1Id));
console.log("Is ticket 2 purchased: ", ticketingRead3.isPurchased(ticket2Id));

console.dir(storage);
console.dir(eventStorage);