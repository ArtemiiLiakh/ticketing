import { SerializedError } from '../types/SerializedError';
import { Exception } from './Exception';

export class NoEnityWithIdException extends Exception {
  message: string;
  statusCode = 404;

  constructor (entity: string) {
    super();
    this.message = `${entity} with such id is not found`;
  }

  serializeError (): SerializedError {
    return {
      message: this.message,
      statusCode: this.statusCode, 
    };
  }
}