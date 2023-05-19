import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(public productService: ProductService) {}
  @Get('getProducts')
  async getProducts(): Promise<Product[]> {
    return await this.productService.getProducts();
  }
  @Get(':id')
  async getProduct(@Param() { id }: any): Promise<Product> {
    console.log('id :>> ', id);
    return await this.productService.getProductById(id);
  }

  @Post('createProduct')
  async createProduct(@Body() input: any): Promise<Product> {
    return await this.productService.createProduct(input);
  }
  @Post('deleteProduct')
  async deleteProduct(@Body() id: number): Promise<boolean> {
    return await this.productService.deleteProduct(id);
  }
}
