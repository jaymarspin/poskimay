import {
  DBSQLiteValues,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { Injectable } from "@angular/core";
import { DatabaseService } from "../services/database.service";
import { Product } from "../models/Product";
import { productImageRepository } from "./product_images/product_images.repository";
import { productStocksRepository } from "./products_stocks/products_stocks.repositories";
import { productPriceRepository } from "./product_prices/product_prices.repositories";
import { categoryRepository } from "./category/category.repository";
@Injectable()
export class ProductRepository {
  constructor(
    private _databaseService: DatabaseService,
    private productImage: productImageRepository,
    private productStocks: productStocksRepository,
    private productPrice: productPriceRepository,
    private category: categoryRepository
  ) {}

  async getProducts(): Promise<Product[]> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        var products: DBSQLiteValues = await db.query("select * from products");
        return products.values as Product[];
      }
    );
  }
  // name TEXT NOT NULL,
  // description TEXT DEFAULT '',
  async getCounts(category?: string,search?: string): Promise<any> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        const searchq = search ? `where name like '%${search}' or description like '%${search}'` : ''
        const tmpq = category ? `where category_id = ${category} ` : ``;
        var count:DBSQLiteValues= await db.query(`select count(*) from products ${tmpq} ${searchq}`);
        return count.values[0];
      }
    );
  }


  async getProductsRelations(offset,category?: string,search?: string,limit?: number): Promise<Product[]> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        const searchq = search ? `where name like '%${search}' or description like '%${search}'` : ''
        const tmpq = category ? `where category_id = ${category} ` : ``;
        console.log(`select * from products ${tmpq} ${searchq} order by id desc limit ${limit ? limit : 20} offset ${offset}`)
        var products: DBSQLiteValues = await db
          .query(`select * from products ${tmpq} ${searchq} order by id desc limit ${limit ? limit : 20} offset ${offset}`)
          .then((res) => res);

        const tmp = new Array<Product>();
        await products.values.map(async (value: Product, i) => {
          const productsimage = await this.productImage
            .getByProductId(value.id)
            .then((res) => res);
          const productStocks = await this.productStocks
            .getByProductId(value.id)
            .then((res) => res);
          const productPrice = await this.productPrice
            .getByProductId(value.id)
            .then((res) => res);

          const productCategory = await this.category
            .getById(value.category_id)
            .then((res) => res);

          const productTmp: Product = {
            name: value.name,
            description: value.description,
            barcode: value.barcode,
            category_id: value.category_id,
            createdAt: value.createdAt,
            category: productCategory,
            productImage: productsimage,
            stocks: productStocks,
            price: productPrice,
            id: value.id
          };
          tmp.push(productTmp);
        });

        return tmp as Product[];
      }
    );
  }

  async createProduct(product: Product) {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string =
          "insert into products (name, description, category_id,barcode) values (?, ?, ?, ?)";
        let values: Array<any> = [
          product.name,
          product.description,
          product.category_id,
          product.barcode,
        ];
        let ret: any = await db.run(sqlcmd, values);
        if (ret.changes.lastId > 0) {
          return ret.changes as Product;
        }
        throw Error("create product failed");
      }
    );
  }

  async updateProduct(product: Product) {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string =
          "update products set name = ?, description = ?, price = ?, imageUrl = ?, isAvailable = ?, isPopular = ?, category = ? where id = ?";
        let values: Array<any> = [
          product.name,
          product.description,
          product.barcode,
          product.category_id,
        ];
        let ret: any = await db.run(sqlcmd, values);
        if (ret.changes.changes > 0) {
          return await this.getProductById(product.id);
        }
        throw Error("update product failed");
      }
    );
  }

  async getProductById(id: number): Promise<Product> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = "select * from products where id = ? limit 1";
        let values: Array<any> = [id];
        let ret: any = await db.query(sqlcmd, values);
        if (ret.values.length > 0) {
          return ret.values[0] as Product;
        }
        throw Error("get product by id failed");
      }
    );
  }

  async deleteProductById(id: number): Promise<void> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        await db.query(`delete from products where id = ${id};`);
      }
    );
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = "select * from products where category = ?";
        let values: Array<any> = [category];
        let ret: any = await db.query(sqlcmd, values);
        if (ret.values.length > 0) {
          return ret.values as Product[];
        }
        throw Error("get products by category failed");
      }
    );
  }
}
