import { OrderStatus } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class productDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;
}
export class orderDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  products: productDto[];
}

export class characterDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  status: OrderStatus;
}
