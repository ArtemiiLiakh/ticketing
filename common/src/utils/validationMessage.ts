import { ValidationOptions } from 'class-validator';

export const validationMessage = (message: string, args?: ValidationOptions): ValidationOptions => {
  return {
    ...args,
    message,
  };
}