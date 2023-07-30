import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Patch('tags/add/:productId')
  addTags(
    @Param('productId') productId: string,
    @Body() body: { tagId: string },
  ) {
    const { tagId } = body;
    return this.productsService.addTags(productId, tagId);
  }

  @Patch('tags/remove/:productId')
  removeTags(
    @Param('productId') productId: string,
    @Body() body: { tagId: string },
  ) {
    const { tagId } = body;
    return this.productsService.removeTags(productId, tagId);
  }

  @Get('tags/:id')
  getTags(@Param('id') id: string) {
    return this.productsService.getTags(id);
  }
}
