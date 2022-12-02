import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productsModel: Model<ProductDocument>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productsModel.create(createProductDto);
  }

  findAll() {
    return this.productsModel.find().lean();
  }

  findOne(id: ObjectId) {
    const product = this.productsModel.findOne({ _id: id });
    return product;
  }

  update(id: ObjectId, updateProductDto: UpdateProductDto) {
    const modi = this.productsModel.updateOne(
      { _id: id },
      { $set: updateProductDto },
    );
    return modi;
  }

  remove(id: ObjectId) {
    const result = this.productsModel.deleteOne({ _id: id });
    return result;
  }
}
