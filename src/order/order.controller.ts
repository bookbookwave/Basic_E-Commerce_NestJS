import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '@prisma/client';
import { updateOrderStatus, orderDto } from './order.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post('createOrder')
  async createOrder(@Body() input: orderDto): Promise<Order> {
    return await this.orderService.createOrder(input);
  }

  @UseGuards(AuthGuard)
  @Post('updateStatus')
  async updateOrderStatus(@Body() input: updateOrderStatus): Promise<Order> {
    return await this.orderService.updateOrderStatus(input);
  }

  @UseGuards(AuthGuard)
  @Post('orderHistory')
  async orderHistory(@Body() input: { email: string }): Promise<Order[]> {
    return await this.orderService.orderHistory(input);
  }
}
