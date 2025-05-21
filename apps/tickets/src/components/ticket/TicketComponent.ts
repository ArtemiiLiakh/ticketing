import { CreateTicketDTO } from './handlers/Create/CreateTicketDTO';
import { CreateTicketHandler } from './handlers/Create/CreateTicketHandler';
import { CreateTicketResponse } from './handlers/Create/CreateTicketResponse';
import { GetTicketByIdDTO } from './handlers/GetTicketById/GetTicketByIdDTO';
import { GetTicketByIdHandler } from './handlers/GetTicketById/GetTicketByIdHandler';
import { GetTicketByIdResponse } from './handlers/GetTicketById/GetTicketByResponse';
import { GetTicketsDTO } from './handlers/GetTickets/GetTicketsDTO';
import { GetTicketsHandler } from './handlers/GetTickets/GetTicketsHandler';
import { GetTicketsResponse } from './handlers/GetTickets/GetTicketsResponse';
import { UpdateTicketDTO } from './handlers/Update/UpdateTicketDTO';
import { UpdateTicketHandler } from './handlers/Update/UpdateTicketHandler';
import { UpdateTicketResponse } from './handlers/Update/UpdateTicketResponse';
import { ITicketComponent } from './ITicketComponent';

export class TicketComponent implements ITicketComponent {
  constructor (
    private readonly createTicketHandler: CreateTicketHandler,
    private readonly getByIdHandler: GetTicketByIdHandler,
    private readonly getTicketsHandler: GetTicketsHandler,
    private readonly updateHandler: UpdateTicketHandler,
  ) {}

  createTicket (dto: CreateTicketDTO): Promise<CreateTicketResponse> {
    return this.createTicketHandler.handle(dto);
  }

  getById(dto: GetTicketByIdDTO): Promise<GetTicketByIdResponse> {
    return this.getByIdHandler.handle(dto);
  }

  getTickets (dto: GetTicketsDTO): Promise<GetTicketsResponse> {
    return this.getTicketsHandler.handle(dto);
  }

  update (dto: UpdateTicketDTO): Promise<UpdateTicketResponse> {
    return this.updateHandler.handle(dto);
  }
}