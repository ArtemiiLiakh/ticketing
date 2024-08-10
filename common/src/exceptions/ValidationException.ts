import { ValidationError } from 'class-validator';
import { SerializedError } from '../types/SerializedError';
import { Exception } from './Exception';

export class ValidationException extends Exception {
  message: string[] = [];
  statusCode = 400;

  constructor (
    public errors: ValidationError[], 
    public field: string = 'body'
  ) {
    super();
  }

  serializeError (): SerializedError {
    for (const error of this.errors) {
      const messages = Object.values(error.constraints ?? {});
      messages.forEach((msg) => this.message.push(
        `obj.${this.field}.${error.property}: ${msg}`
      ));
    };
    
    return {
      message: this.message,
      statusCode: this.statusCode, 
    };
  }
}
