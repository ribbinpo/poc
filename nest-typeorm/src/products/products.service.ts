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
    return this.productModel.find().exec();
  }

  findOne(id: string) {
    return this.productModel.findById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  addTags(productId: string, tagId: string) {
    return this.productModel.findByIdAndUpdate(
      productId,
      { $addToSet: { tag: tagId } },
      { new: true },
    );
  }

  removeTags(productId: string, tagId: string) {
    return this.productModel.findByIdAndUpdate(
      productId,
      { $pull: { tag: tagId } },
      { new: true },
    );
  }

  async getTags(productId: string) {
    const product = await this.findOne(productId).populate('tag');
    return product.tag;
  }
}
