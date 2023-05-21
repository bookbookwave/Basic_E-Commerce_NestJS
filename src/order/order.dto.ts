import { OrderStatus } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class productDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;
}
export class orderDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  products: productDto[];
}

export class updateOrderStatus {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  status: OrderStatus;
}
