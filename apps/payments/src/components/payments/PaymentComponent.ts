import { IPaymentComponent } from './IPaymentComponent';
import { CompletePaymentHandler } from './handlers/Complete/ComletePaymentHandler';
import { CompletePaymentDTO } from './handlers/Complete/CompletePaymentDTO';
import { CompletePaymentResponse } from './handlers/Complete/CompletePaymentReponse';
import { CreatePaymentDTO } from './handlers/Create/CreatePaymentDTO';
import { CreatePaymentHandler } from './handlers/Create/CreatePaymentHandler';
import { CreatePaymentResponse } from './handlers/Create/CreatePaymentResponse';

export class PaymentComponent implements IPaymentComponent {
  constructor (
    private readonly createPaymentHandler: CreatePaymentHandler,
    private readonly completePaymentHandler: CompletePaymentHandler,
  ) {}
  
  create(dto: CreatePaymentDTO): Promise<CreatePaymentResponse> {
    return this.createPaymentHandler.handle(dto);
  }

  complete(dto: CompletePaymentDTO): Promise<CompletePaymentResponse> {
    return this.completePaymentHandler.handle(dto);
  }
}