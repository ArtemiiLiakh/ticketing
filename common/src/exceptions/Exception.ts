import { SerializedError } from '../types/SerializedError';

export interface IException {
  message: string | string[];
  statusCode: number;
}

export class Exception extends Error implements IException {
  message: any = 'Exception';
  statusCode = 400;
  
  constructor (message?: any) {
    super();
    this.message = message ? message : this.message;
  }

  serializeError(): SerializedError {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  };
}