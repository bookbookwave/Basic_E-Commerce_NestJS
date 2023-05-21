import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('product')
export class ProductController {
  constructor(public productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Get('getProducts')
  async getProducts(): Promise<Product[]> {
    return await this.productService.getProducts();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getProduct(@Param() { id }: any): Promise<Product> {
    return await this.productService.getProductById(Number(id));
  }

  @UseGuards(AuthGuard)
  @Post('createProduct')
  async createProduct(@Body() input: any): Promise<Product> {
    return await this.productService.createProduct(input);
  }

  @UseGuards(AuthGuard)
  @Post('deleteProduct')
  async deleteProduct(@Body() id: number): Promise<boolean> {
    return await this.productService.deleteProduct(id);
  }
}
