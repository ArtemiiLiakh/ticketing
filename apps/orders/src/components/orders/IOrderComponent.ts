import { CancelOrderDTO } from './handlers/Cancel/CancelOrderDTO';
import { CancelOrderResponse } from './handlers/Cancel/CancelOrderResponse';
import { CreateOrderDTO } from './handlers/Create/CreateOrderDTO';
import { CreateOrderResponse } from './handlers/Create/CreateOrderResponse';
import { GetByIdOrderDTO } from './handlers/GetById/GetByIdOrderDTO';
import { GetByIdOrderResponse } from './handlers/GetById/GetByIdOrderResponse';
import { GetByUserDTO } from './handlers/GetByUser/GetByUserDTO';
import { GetByUserResponse } from './handlers/GetByUser/GetByUserResponse';

export interface IOrderComponent {
  create (dto: CreateOrderDTO): Promise<CreateOrderResponse>;
  cancel (dto: CancelOrderDTO): Promise<CancelOrderResponse>;
  getById (dto: GetByIdOrderDTO): Promise<GetByIdOrderResponse>;
  getByUser (dto: GetByUserDTO): Promise<GetByUserResponse>;
}