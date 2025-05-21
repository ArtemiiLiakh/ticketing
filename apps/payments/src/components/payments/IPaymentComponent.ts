import { CompletePaymentDTO } from './handlers/Complete/CompletePaymentDTO';
import { CompletePaymentResponse } from './handlers/Complete/CompletePaymentReponse';
import { CreatePaymentDTO } from './handlers/Create/CreatePaymentDTO';
import { CreatePaymentResponse } from './handlers/Create/CreatePaymentResponse';

export interface IPaymentComponent {
  create(dto: CreatePaymentDTO): Promise<CreatePaymentResponse>;
  complete(dto: CompletePaymentDTO): Promise<CompletePaymentResponse>;
}