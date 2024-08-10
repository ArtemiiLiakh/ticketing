import { Exception } from './Exception';

export class NotFoundException extends Exception {
  message = 'Route not found';
  statusCode = 404;
}