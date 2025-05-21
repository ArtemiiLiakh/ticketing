import { CreateTicketDTO } from './handlers/Create/CreateTicketDTO';
import { CreateTicketResponse } from './handlers/Create/CreateTicketResponse';
import { GetTicketByIdDTO } from './handlers/GetTicketById/GetTicketByIdDTO';
import { GetTicketByIdResponse } from './handlers/GetTicketById/GetTicketByResponse';
import { GetTicketsDTO } from './handlers/GetTickets/GetTicketsDTO';
import { GetTicketsResponse } from './handlers/GetTickets/GetTicketsResponse';

export interface ITicketComponent {
  createTicket (dto: CreateTicketDTO): Promise<CreateTicketResponse>;
  getById (dto: GetTicketByIdDTO): Promise<GetTicketByIdResponse>;
  getTickets (dto: GetTicketsDTO): Promise<GetTicketsResponse>;
}