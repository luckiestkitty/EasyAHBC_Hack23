import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop({ required: true })
  prompt: string;

  @Prop({ type: [{ url: String, createdAt: Date }] })
  imageUrls: { url: string; createdAt: Date }[];

  @Prop({ default: Date.now })
  createdAt: Date;
}


export const ImageSchema = SchemaFactory.createForClass(Image);
export default { Image, ImageSchema };