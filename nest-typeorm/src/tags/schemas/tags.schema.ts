import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TagsDocument = HydratedDocument<Tags>;

@Schema()
export class Tags {
  @Prop({ required: true, type: String })
  name: string;
}

export const TagsSchema = SchemaFactory.createForClass(Tags);
