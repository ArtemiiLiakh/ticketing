import { EventEmitter } from 'events';
import { ICommand } from './abstractions/ICommand';
import { IQuery } from './abstractions/IQuery';

export class EventStorage {
  private commands: ICommand[] = [];
  private queries: IQuery[] = [];
  
  constructor (
    eventEmitter: EventEmitter
  ) {
    eventEmitter.on('query', (query: IQuery) => {
      if (query.type !== 'query') {
        throw new Error('Query type is wrong');
      }

      console.log('Storage got query: ', query);
      this.queries.push(query)
    });

    eventEmitter.on('command', (command: ICommand) => {
      if (command.type !== 'command') {
        throw new Error('Command type is wrong');
      }

      console.log('Storage got command: ', command);
      this.commands.push(command);
    });
  } 
}