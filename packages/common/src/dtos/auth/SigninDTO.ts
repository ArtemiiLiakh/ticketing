import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class SignInDTO {
  @IsNotEmpty()
  @IsEmail()
    email: string;

  @IsNotEmpty()
    password: string;
}