import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  @IsEmail()
    email: string;
  
  @IsNotEmpty()
  @Matches(/[a-z0-9]+/)
    password: string;

  @IsNotEmpty()
    name: string;

  @IsOptional()
    pictureUrl?: string;
}