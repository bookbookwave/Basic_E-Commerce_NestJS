import { Injectable } from '@nestjs/common';
import { OrderStatus, order } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { characterDto, orderDto } from './order.dto';

@Injectable()
export class OrderService {
  changeStatus = async (input: characterDto): Promise<order> => {
    try {
      return await this.db.order.update({
        where: { id: input.id },
        data: {
          status: input.status,
        },
        include: {
          OrderItem: true,
          user: { select: { name: true, email: true } },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  };
  constructor(private readonly db: PrismaService) {}

  createOrder = async (input: orderDto): Promise<order> => {
    return await this.db.order.create({
      data: {
        OrderItem: {
          create: input.products,
        },
        status: OrderStatus.PENDING,
        user: {
          connect: {
            id: input.userId,
          },
        },
      },
      include: { OrderItem: true, user: true },
    });
  };
}
