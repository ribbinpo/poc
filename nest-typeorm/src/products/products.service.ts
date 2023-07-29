import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name, 'products') private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const createdProduct = new this.productModel(createProductDto);
      return createdProduct.save();
    } catch (e) {
      console.error(e);
    }
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async findOne(id: string) {
    return await this.productModel.findById(id).exec();
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel
      .updateOne({ _id: id }, updateProductDto, {
        upsert: true,
      })
      .exec();
  }

  remove(id: string) {
    return this.productModel.findByIdAndRemove(id).exec();
  }

  addTags(productId: string, tagId: string) {
    return this.productModel
      .findByIdAndUpdate(
        productId,
        { $addToSet: { tag: tagId } },
        { new: true },
      )
      .exec();
  }

  removeTags(productId: string, tagId: string) {
    return this.productModel
      .findByIdAndUpdate(productId, { $pull: { tag: tagId } }, { new: true })
      .exec();
  }

  async getTags(productId: string) {
    const product = await (await this.findOne(productId)).populate('tag');
    return product.tag;
  }
}
