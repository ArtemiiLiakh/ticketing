import { IsNotEmpty } from "class-validator";
import { validationMessage } from "../../utils/validationMessage";

export class OrdersCreateDTO {
  @IsNotEmpty(validationMessage('ticket id is required'))
    ticketId: string;
}