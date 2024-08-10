import { Exception } from './Exception';

export class AlreadyExistsException extends Exception {
  statusCode = 400;
  message: string; 

  constructor (public entity: string) {
    super();
    this.message = `${entity} already exists`;
  };
}