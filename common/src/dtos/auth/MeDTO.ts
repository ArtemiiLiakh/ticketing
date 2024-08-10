import { IsNotEmpty } from 'class-validator';

export class MeDTO {
  @IsNotEmpty()
    userId: string;
}