import { IsEmail, IsNotEmpty } from 'class-validator';

export class authDto {
  @IsEmail()
  email: string;

  name: string;

  @IsNotEmpty()
  password: string;

  confirmPassword: string;
}
