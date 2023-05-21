import { Injectable } from '@nestjs/common';
import { OrderStatus, Order } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { changeStatusDto, orderDto } from './order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly db: PrismaService) {}

  changeStatus = async (input: changeStatusDto): Promise<Order> => {
    try {
      const order = await this.db.order.findUnique({ where: { id: input.id } });
      if (!order) {
        throw new Error('Order not found');
      }
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

  createOrder = async (input: orderDto): Promise<Order> => {
    try {
      const user = await this.db.user.findUnique({
        where: { id: input.userId },
      });
      if (!user) {
        throw new Error('User not found');
      }

      let totalPrice = 0;
      const newOrder = [];
      for (let i = 0; i < input.products.length; i++) {
        const product = await this.db.product.findUnique({
          where: { id: input.products[i].productId },
          select: { price: true },
        });
        if (!product) {
          throw new Error('Product not found');
        }

        const pricePerProduct = product.price * input.products[i].quantity;
        totalPrice += product.price * input.products[i].quantity;

        newOrder.push({ ...input.products[i], price: pricePerProduct });
      }

      return await this.db.order.create({
        data: {
          total: totalPrice,
          OrderItem: {
            create: newOrder,
          },
          status: OrderStatus.PENDING,
          user: {
            connect: {
              id: input.userId,
            },
          },
        },
        include: {
          OrderItem: true,
          user: { select: { email: true, name: true } },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  };
}
