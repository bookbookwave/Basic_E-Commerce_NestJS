import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { order } from '@prisma/client';
import { characterDto, orderDto } from './order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('createOrder')
  async createOrder(@Body() input: orderDto): Promise<order> {
    console.log('input :>> ', input);
    return await this.orderService.createOrder(input);
  }
  @Post('changeStatus')
  async changeStatus(@Body() input: characterDto): Promise<order> {
    console.log('input :>> ', input);
    return await this.orderService.changeStatus(input);
  }
}
