import { IsNumber, IsOptional, Min } from "class-validator";
import { validationMessage } from "../../utils/validationMessage";

export class TicketsUpdateDTO {
  @IsOptional()
    title?: string;

  @IsOptional()
  @IsNumber({}, validationMessage('Price must be a number'))
  @Min(0, validationMessage('Price must be greater than 0'))
    price?: number;
}