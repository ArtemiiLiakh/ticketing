import { NextFunction, Request, Response } from 'express';
import { ValidationError, ValidatorOptions, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ValidationException } from '../exceptions';

interface ValidationFields {
  params?: new () => any;
  query?: new () => any;
  body?: new () => any;
}

export const validateRequest = (fields: ValidationFields, validatorOptions?: ValidatorOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errors: ValidationError[] = [];
    for (const [field, type] of Object.entries(fields)) {
      const data = plainToInstance(type, req[field]); 
      errors.push(...await validate(data, validatorOptions));
      if (errors.length) {
        throw new ValidationException(errors, field);
      }
    };
    next();
  };
};