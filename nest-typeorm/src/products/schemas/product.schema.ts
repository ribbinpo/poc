import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
}

export const ProductSchema = SchemaFactory.createForClass(Product);
