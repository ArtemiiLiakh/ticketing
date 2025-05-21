import { IsArray, IsNotEmpty, IsOptional } from "class-validator";
import { validationMessage } from "../../utils/validationMessage";

export class PaymentsCreateDTO {
  @IsNotEmpty(validationMessage('order id is required'))
    orderId: string;

  @IsNotEmpty(validationMessage('payment method types are required'))
  @IsArray(validationMessage('payment method types must be an array'))
    payment_method_types: string[];

  @IsOptional()
    idempotencyKey?: string;
}