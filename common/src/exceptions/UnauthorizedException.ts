import { Exception } from './Exception';

export class UnauthorizedException extends Exception {
  statusCode = 401;
  message = 'Unauthorized';
}