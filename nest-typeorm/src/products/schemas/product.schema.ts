import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Tags } from 'src/tags/schemas/tags.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true, type: String })
  name: string;

  @Prop(Number)
  price: number;

  @Prop(String)
  description: string;

  @Prop([String])
  source: string[];

  @Prop({ required: true, type: String })
  owner: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }] })
  tag: Tags;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
