import { Exception } from './Exception';

export class DatabaseConnectionException extends Exception {
  message = 'Can\'t connect to database';
  statusCode = 500;
}