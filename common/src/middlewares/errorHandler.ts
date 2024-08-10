import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../responses/ErrorResponse';
import { Exception } from '../exceptions/Exception';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!(err instanceof Exception)) {
    res.status(500).send({
      error: 'InternalServerError',
      message: err.message,
    });
    return;
  }
  
  const { message, statusCode } = err.serializeError();

  res.status(statusCode).send({
    error: err.constructor.name,
    message,
  } as ErrorResponse);
};