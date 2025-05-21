import { Exception } from './Exception';

export class BadBodyException extends Exception {
  statusCode = 400;
  message = 'Bad request body';
}