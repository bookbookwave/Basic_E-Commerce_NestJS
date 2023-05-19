import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly db: PrismaService) {}

  getProducts = async (): Promise<Product[]> => {
    return await this.db.product.findMany();
  };

  getProductById = async (id: number): Promise<Product> => {
    return await this.db.product.findUnique({ where: { id: id } });
  };

  createProduct = async (input: any) => {
    return this.db.product.create({
      data: {
        name: input.name,
        price: input.price,
      },
    });
  };

  deleteProduct = async (id: number) => {
    const product = await this.db.product.delete({ where: { id: id } });
    if (!product) {
      return true;
    }
    return false;
  };
}
