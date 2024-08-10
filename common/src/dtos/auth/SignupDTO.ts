import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @Matches(/[a-z0-9]+/)
    password: string;
}