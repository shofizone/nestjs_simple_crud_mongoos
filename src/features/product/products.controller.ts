import { Delete } from '@nestjs/common';
import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {
  }

  @Post()
  async addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): Promise<any> {
    return await this.productService.insertProduct(title, description, price);
  }

  @Get()
  async getAllProducts(): Promise<any> {
    return {
      products: await this.productService.getAllProducts(),
    };
  }

  @Get(':id')
  async  getProduct(@Param('id') id: string): Promise<any> {
    return await this.productService.getProduct(id);
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string,
                @Body('title') title: string,
                @Body('description') description: string,
                @Body('price') price: number,
  ): Promise<any> {
    return await this.productService.updateAProduct(id, title, description, price);
  }

  @Delete(':id')
  async  deleteProduct(@Param('id') id: string,
  ): Promise<any> {
    return await  this.productService.deleteAProduct(id);
  }


}
