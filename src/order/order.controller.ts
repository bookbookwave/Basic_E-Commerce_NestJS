import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '@prisma/client';
import { changeStatusDto, orderDto } from './order.dto';
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
  @Post('changeStatus')
  async changeStatus(@Body() input: changeStatusDto): Promise<Order> {
    return await this.orderService.changeStatus(input);
  }
}
