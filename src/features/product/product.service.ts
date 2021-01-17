import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductSchema, Product, ProductDocument } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tryCatch } from 'rxjs/internal-compatibility';


@Injectable()
export class ProductService {
  private products: Product[] = [];

  constructor(@InjectModel('Product') private readonly  productModel: Model<ProductDocument>) {
  }

  async insertProduct(title: string, description: string, price: number) {

    try {

      const newProduct = new this.productModel(
        {
          title,
          description,
          price,
        },
      );

      let doc = await newProduct.save();

      return doc;
    } catch (e) {
      throw new BadRequestException('Unable to create document');
    }
  }

  async getAllProducts() {

    try {
      let docs = await this.productModel.find().select('-__v');
      // console.log(docs);
      return docs;
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Unable to get document');
    }

  }

  async getProduct(id: string) {

    try {
      let doc = await this.productModel.findById({ _id: id });
      if (!doc) {
        throw new NotFoundException();
      }
      // console.log(docs);
      return doc;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateAProduct(id: string, title: string, desc: string, price: number) {

  }

  async deleteAProduct(id: string) {
    try {
      let doc = await this.productModel.deleteOne({ _id: id });
      // console.log(docs);
      return doc;
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Unable to get document');
    }
  }
}
