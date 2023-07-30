import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tags } from './schemas/tags.schema';
import { Model } from 'mongoose';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tags.name, 'products') private tagsModel: Model<Tags>,
  ) {}
  create(createTagDto: CreateTagDto) {
    const createdTag = new this.tagsModel(createTagDto);
    return createdTag.save();
  }

  findAll() {
    return this.tagsModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
