import { IsNotEmpty } from "class-validator";
import { validationMessage } from "../../utils/validationMessage";

export class PaymentsCompleteDTO {
  @IsNotEmpty(validationMessage('Order id is required'))
    orderId: string;
}