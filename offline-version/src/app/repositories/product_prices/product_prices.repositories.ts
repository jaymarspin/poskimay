import {
  DBSQLiteValues,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { Injectable } from "@angular/core";
import { DatabaseService } from "../../services/database.service";
import { ProductPrice, ProductStocks } from "../../models/Product";

@Injectable()
export class productPriceRepository {
  table = "product_price";
  constructor(private _databaseService: DatabaseService) {}

  async get(): Promise<ProductPrice[]> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        var products: DBSQLiteValues = await db.query(
          `select * from ${this.table}`
        );
        return products.values as ProductPrice[];
      }
    );
  }

  async create(data: ProductPrice) {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = `insert into ${this.table} (product_id, price) values (?, ?)`;
        let values: Array<any> = [data.product_id, data.price];
        let ret: any = await db.run(sqlcmd, values);
        if (ret.changes.lastId > 0) {
          return ret.changes as ProductStocks;
        }
        throw Error("create product stock failed");
      }
    );
  }

  async update(data: ProductPrice) {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = `update ${this.table} set price = ?, where id = ?`;
        let values: Array<any> = [data.price, data.id];
        let ret: any = await db.run(sqlcmd, values);
        if (ret.changes.changes > 0) {
          return await this.getId(data.id);
        } else {
          return [];
        }
        // throw Error("update product stock failed");
      }
    );
  }

  async getId(id: number): Promise<ProductPrice> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = `select * from ${this.table} where id = ? limit 1`;
        let values: Array<any> = [id];
        let ret: any = await db.query(sqlcmd, values);
        if (ret.values.length > 0) {
          return ret.values[0] as ProductPrice;
        } else {
          return [];
        }
        // throw Error("get product stock by id failed");
      }
    );
  }

  async getByProductId(id: number): Promise<ProductPrice> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = `select * from ${this.table} where product_id = ? ORDER BY id DESC limit 1`;
        let values: Array<any> = [id];
        let ret: any = await db.query(sqlcmd, values);
        if (ret.values.length > 0) {
          return ret.values[0] as ProductPrice;
        } else {
          return [];
        }
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
