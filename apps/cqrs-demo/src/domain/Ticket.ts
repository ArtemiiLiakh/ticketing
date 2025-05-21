export class Ticket {
  constructor (
    public id: string,
    public title: string,
    public price: number,
    public isPurchased: boolean = false,
  ) {}
}