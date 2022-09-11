import {
  DBSQLiteValues,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { Injectable } from "@angular/core";
import { DatabaseService } from "../../services/database.service";
import { ProductStocks } from "../../models/Product";

@Injectable()
export class productStocksRepository {
  table = "products_stocks";
  constructor(private _databaseService: DatabaseService) {}

  async get(): Promise<ProductStocks[]> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        var products: DBSQLiteValues = await db.query(
          `select * from ${this.table}`
        );
        return products.values as ProductStocks[];
      }
    );
  }

  async create(data: ProductStocks) {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = `insert into ${this.table} (product_id, stocks_count) values (?, ?)`;
        let values: Array<any> = [data.product_id, data.stocks_count];
        let ret: any = await db.run(sqlcmd, values);
        if (ret.changes.lastId > 0) {
          return ret.changes as ProductStocks;
        }
        throw Error("create product stock failed");
      }
    );
  }

  async update(data: ProductStocks) {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = `update ${this.table} set stocks_count = ?, where id = ?`;
        let values: Array<any> = [data.stocks_count, data.id];
        let ret: any = await db.run(sqlcmd, values);
        if (ret.changes.changes > 0) {
          return await this.getById(data.id);
        } else {
          return [];
        }
        // throw Error("update product stock failed");
      }
    );
  }

  async getById(id: number): Promise<ProductStocks> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = `select * from ${this.table} where id = ? limit 1`;
        let values: Array<any> = [id];
        let ret: any = await db.query(sqlcmd, values);
        if (ret.values.length > 0) {
          return ret.values[0] as ProductStocks;
        } else {
          return [];
        }
        // throw Error("get product stock by id failed");
      }
    );
  }

  async getByProductId(id: number): Promise<ProductStocks> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = `select * from ${this.table} where product_id = ? ORDER BY id DESC limit 1`;
        let values: Array<any> = [id];
        let ret: any = await db.query(sqlcmd, values);
        if (ret.values.length > 0) {
          return ret.values[0] as ProductStocks;
        } else {
          return [];
        }
        // throw Error("get product stock by id failed");
      }
    );
  }

  async deleteProductImageById(id: number): Promise<void> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        await db.query(`delete from ${this.table} where id = ${id};`);
      }
    );
  }
}
