import { IsNotEmpty, IsNumber } from 'class-validator';

export class productDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
