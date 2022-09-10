import {
  DBSQLiteValues,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { Injectable } from "@angular/core";
import { DatabaseService } from "../../services/database.service";
import { ProductImage } from "src/app/models/Product";

@Injectable()
export class productImageRepository {
  constructor(private _databaseService: DatabaseService) {}

  async getProductImages(): Promise<ProductImage[]> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        var products: DBSQLiteValues = await db.query(
          "select * from product_image"
        );
        return products.values as ProductImage[];
      }
    );
  }

  async createProductImage(productImage: ProductImage) {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string =
          "insert into product_image (product_id, blobdata) values (?, ?)";
        let values: Array<any> = [
          productImage.product_id,
          productImage.blobdata,
        ];
        let ret: any = await db.run(sqlcmd, values);
        if (ret.changes.lastId > 0) {
          return ret.changes as ProductImage;
        }
        throw Error("create product image failed");
      }
    );
  }

  async updateProducImage(productImage: ProductImage) {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string =
          "update product_image set blobdata = ?, where id = ?";
        let values: Array<any> = [productImage.blobdata, productImage.id];
        let ret: any = await db.run(sqlcmd, values);
        if (ret.changes.changes > 0) {
          return await this.getProducImageById(productImage.id);
        }
        throw Error("update product image failed");
      }
    );
  }

  async getProducImageById(id: number): Promise<ProductImage> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = "select * from product_image where id = ? limit 1";
        let values: Array<any> = [id];
        let ret: any = await db.query(sqlcmd, values);
        if (ret.values.length > 0) {
          return ret.values[0] as ProductImage;
        }
        throw Error("get product image by id failed");
      }
    );
  }

  async deleteProductImageById(id: number): Promise<void> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        await db.query(`delete from product_image where id = ${id};`);
      }
    );
  }
}
