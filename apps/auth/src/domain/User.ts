export interface User {
  id: string;
  name: string,
  email: string;
  pictureUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}