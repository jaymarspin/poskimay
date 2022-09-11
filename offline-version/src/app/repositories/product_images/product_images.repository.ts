import {
  DBSQLiteValues,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { Injectable } from "@angular/core";
import { DatabaseService } from "../../services/database.service";
import { ProductImage } from "src/app/models/Product";

@Injectable()
export class productImageRepository {
  table = "product_image";
  constructor(private _databaseService: DatabaseService) {}

  async get(): Promise<ProductImage[]> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        var products: DBSQLiteValues = await db.query(
          `select * from ${this.table}`
        );
        return products.values as ProductImage[];
      }
    );
  }

  async create(data: ProductImage) {
    console.log(data);
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = `insert into ${this.table} (product_id, blobdata) values (?, ?)`;
        let values: Array<any> = [data.product_id, data.blobdata];
        let ret: any = await db.run(sqlcmd, values);
        if (ret.changes.lastId > 0) {
          return ret.changes as ProductImage;
        } else {
          return [];
        }
      }
    );
  }

  async update(productImage: ProductImage) {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = `update ${this.table} set blobdata = ?, where id = ?`;
        let values: Array<any> = [productImage.blobdata, productImage.id];
        let ret: any = await db.run(sqlcmd, values);
        if (ret.changes.changes > 0) {
          return await this.getById(productImage.id);
        } else {
          return [];
        }
      }
    );
  }

  async getById(id: number): Promise<ProductImage> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = `select * from ${this.table} where id = ? limit 1`;
        let values: Array<any> = [id];
        let ret: any = await db.query(sqlcmd, values);
        if (ret.values.length > 0) {
          return ret.values[0] as ProductImage;
        } else {
          return [];
        }
        // throw Error("get product image by id failed");
      }
    );
  }

  async getByProductId(id: number): Promise<ProductImage> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = `select * from ${this.table} where product_id = ? ORDER BY id DESC limit 1`;
        let values: Array<any> = [id];
        let ret: any = await db.query(sqlcmd, values);
        if (ret.values.length > 0) {
          return ret.values[0] as ProductImage;
        } else {
          return [];
        }
        // throw Error("get product image by id failed");
      }
    );
  }

  async deleteById(id: number): Promise<void> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        await db.query(`delete from ${this.table} where id = ${id};`);
      }
    );
  }
}
