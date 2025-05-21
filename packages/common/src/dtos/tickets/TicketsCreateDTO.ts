import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { validationMessage } from '../../utils/validationMessage';

export class TicketsCreateDTO {
  @IsNotEmpty(validationMessage('Title is required'))  
  @IsString()
    title: string;

  @IsNotEmpty(validationMessage('Price is required'))
  @IsNumber({}, validationMessage('Price must be a number'))
  @Min(0, validationMessage('Price must be greater than 0'))
    price: number;
}