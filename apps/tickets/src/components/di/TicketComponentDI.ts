import { CreateTicketHandler } from '@components/ticket/handlers/Create/CreateTicketHandler';
import { GetTicketByIdHandler } from '@components/ticket/handlers/GetTicketById/GetTicketByIdHandler';
import { GetTicketsHandler } from '@components/ticket/handlers/GetTickets/GetTicketsHandler';
import { UpdateTicketHandler } from '@components/ticket/handlers/Update/UpdateTicketHandler';
import { TicketComponent } from '@components/ticket/TicketComponent';
import { NATSEventBusDI } from '@di/EventBusDI';
import { TicketRepositoryDI } from './TicketRepositoryDI';

const CreateHandler = new CreateTicketHandler(TicketRepositoryDI, NATSEventBusDI);
const GetById = new GetTicketByIdHandler(TicketRepositoryDI);
const GetTickets = new GetTicketsHandler(TicketRepositoryDI);
const Update = new UpdateTicketHandler(TicketRepositoryDI, NATSEventBusDI);

export const TicketComponentDI = new TicketComponent(
  CreateHandler,
  GetById,
  GetTickets,
  Update,
);