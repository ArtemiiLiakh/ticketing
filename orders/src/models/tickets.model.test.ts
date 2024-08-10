import { Tickets } from "./tickets";

describe('Testing tickets model', () => {
  it('implement optimistic concurrency control', async () => {
    const ticket = Tickets.build({ 
      title: 'ticket',
      price: 10,
      userId: 'user',
    });

    await ticket.save();

    const firstTicket = await Tickets.findById(ticket.id);
    const secondTicket = await Tickets.findById(ticket.id);
  
    firstTicket!.set({
      price: 20,
    });

    secondTicket!.set({
      price: 20,
    });

    expect(firstTicket).toBeDefined();
    expect(secondTicket).toBeDefined();

    await firstTicket!.save();
    expect(secondTicket!.save()).rejects.toThrow();
    expect(firstTicket!.version).toEqual(1);
  });

  it('increments version number on every save', async () => {
    const ticket = Tickets.build({ 
      title: 'ticket',
      price: 10,
      userId: 'user',
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);
    
    await ticket.save();
    expect(ticket.version).toEqual(1);
    
    await ticket.save();
    expect(ticket.version).toEqual(2);
  });
});