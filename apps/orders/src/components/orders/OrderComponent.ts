import { CancelOrderDTO } from './handlers/Cancel/CancelOrderDTO';
import { CancelOrderHandler } from './handlers/Cancel/CancelOrderHandler';
import { CancelOrderResponse } from './handlers/Cancel/CancelOrderResponse';
import { CreateOrderDTO } from './handlers/Create/CreateOrderDTO';
import { CreateOrderHandler } from './handlers/Create/CreateOrderHandler';
import { CreateOrderResponse } from './handlers/Create/CreateOrderResponse';
import { GetByIdOrderDTO } from './handlers/GetById/GetByIdOrderDTO';
import { GetByIdOrderHandler } from './handlers/GetById/GetByIdOrderHandler';
import { GetByIdOrderResponse } from './handlers/GetById/GetByIdOrderResponse';
import { GetByUserDTO } from './handlers/GetByUser/GetByUserDTO';
import { GetByUserHandler } from './handlers/GetByUser/GetByUserHandler';
import { GetByUserResponse } from './handlers/GetByUser/GetByUserResponse';
import { IOrderComponent } from './IOrderComponent';

export class OrderComponent implements IOrderComponent {
  constructor (
    private readonly createOrderHandler: CreateOrderHandler,
    private readonly cancelOrderHandler: CancelOrderHandler,
    private readonly getByIdOrderHadler: GetByIdOrderHandler,
    private readonly getByUserHandler: GetByUserHandler,
  ) {}
  
  create(dto: CreateOrderDTO): Promise<CreateOrderResponse> {
    return this.createOrderHandler.handle(dto);   
  }

  cancel(dto: CancelOrderDTO): Promise<CancelOrderResponse> {
    return this.cancelOrderHandler.handle(dto);
  }

  getById(dto: GetByIdOrderDTO): Promise<GetByIdOrderResponse> {
    return this.getByIdOrderHadler.handle(dto);
  }

  getByUser(dto: GetByUserDTO): Promise<GetByUserResponse> {
    return this.getByUserHandler.handle(dto);
  }
}