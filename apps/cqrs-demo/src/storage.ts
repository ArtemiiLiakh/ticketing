import { Ticket } from '@domain/Ticket';
import { randomUUID } from 'crypto';

export class TicketStorage {
  private data: Map<string, Ticket>;

  constructor () {
    this.data = new Map();
  }

  save (title: string, price: number): string {
    const id = randomUUID();

    const ticket = new Ticket(id, title, price);

    this.data.set(id, ticket);
    return id;
  }

  getById (id: string): Ticket | null {
    return this.data.get(id) ?? null;
  }

  getAll (): Ticket[] {
    return Array.from(this.data.values());
  }

  setPurchase (id: string, isPurchased: boolean): void {
    const ticket = this.data.get(id);

    if (!ticket) {
      throw new Error('Ticket in storage not found. <Database side>');
    }

    ticket.isPurchased = isPurchased;
  }
}
