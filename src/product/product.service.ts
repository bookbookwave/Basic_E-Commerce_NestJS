import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { productDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly db: PrismaService) {}

  getProducts = async (): Promise<Product[]> => {
    try {
      return await this.db.product.findMany();
    } catch (error) {
      throw new Error(error);
    }
  };

  getProductById = async (id: number): Promise<Product> => {
    try {
      return await this.db.product.findFirst({ where: { id: id } });
    } catch (error) {
      throw new Error(error);
    }
  };

  createProduct = async (input: productDto): Promise<Product> => {
    try {
      return this.db.product.create({
        data: {
          name: input.name,
          price: input.price,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  updateProduct = async (input: productDto): Promise<Product> => {
    try {
      const product = await this.db.product.findUnique({
        where: { id: input.id },
      });
      if (!product) {
        throw new Error('Product not found');
      }
      return await this.db.product.update({
        where: { id: input.id },
        data: {
          name: input.name,
          price: input.price,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteProduct = async (id: number): Promise<boolean> => {
    try {
      const hasProduct = await this.db.product.findUnique({
        where: { id: id },
      });
      if (!hasProduct) {
        throw new Error('Product not found');
      }
      const product = await this.db.product.delete({ where: { id: id } });
      if (!product) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(error);
    }
  };
}
