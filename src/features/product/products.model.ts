import * as mongoos from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export  type  ProductDocument = Product & mongoos.Document;

@Schema()
export class Product {

  @Prop()
  id: string;
  @Prop({required: true})
  title: string;
  @Prop({required: true})
  description: string;
  @Prop({required: true})
  price: number;

}

export const  ProductSchema = SchemaFactory.createForClass(Product);