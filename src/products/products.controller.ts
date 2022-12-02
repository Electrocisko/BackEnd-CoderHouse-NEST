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
import { ConfigService } from '@nestjs/config';
import { ObjectId } from 'mongoose';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private config: ConfigService,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    console.log(this.config.get<string>('MODE'));
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.productsService.remove(id);
  }
}
