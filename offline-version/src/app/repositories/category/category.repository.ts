import {
  DBSQLiteValues,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { Injectable } from "@angular/core";
import { DatabaseService } from "../../services/database.service";
import { Category } from "src/app/models/category";

@Injectable()
export class categoryRepository {
  table = "categories";
  constructor(private _databaseService: DatabaseService) {}

  async get(): Promise<Category[]> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        var products: DBSQLiteValues = await db.query(
          `select * from ${this.table}`
        );
        return products.values as Category[];
      }
    );
  }

  async create(data: Category) {
    console.log(data);
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = `insert into ${this.table} (category) values (?)`;
        let values: Array<any> = [data.category];
        let ret: any = await db.run(sqlcmd, values);
        if (ret.changes.lastId > 0) {
          return ret.changes as Category;
        } else {
          return [];
        }
      }
    );
  }

  async update(data: Category) {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = `update ${this.table} set category = ?, where id = ?`;
        let values: Array<any> = [data.category];
        let ret: any = await db.run(sqlcmd, values);
        if (ret.changes.changes > 0) {
          return await this.getById(data.id);
        } else {
          return [];
        }
      }
    );
  }

  async getById(id: number): Promise<Category> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = `select * from ${this.table} where id = ? limit 1`;
        let values: Array<any> = [id];
        let ret: any = await db.query(sqlcmd, values);
        if (ret.values.length > 0) {
          return ret.values[0] as Category;
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
