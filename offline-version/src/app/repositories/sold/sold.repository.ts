import {
    DBSQLiteValues,
    SQLiteDBConnection,
  } from "@capacitor-community/sqlite";
  import { Injectable } from "@angular/core";
  import { DatabaseService } from "../../services/database.service"; 
import { wholesold,sold } from "src/app/models/sold";
  
  @Injectable()
  export class soldRepository {
    table = "sold";
    constructor(private _databaseService: DatabaseService) {}
  
    async get(): Promise<sold[]> {
      return this._databaseService.executeQuery<any>(
        async (db: SQLiteDBConnection) => {
          var products: DBSQLiteValues = await db.query(
            `select * from ${this.table}`
          );
          return products.values as sold[];
        }
      );
    }

    async getWithRelations(offset?: number,limit?: number): Promise<sold[]> {
        return this._databaseService.executeQuery<any>(
          async (db: SQLiteDBConnection) => {
            var products: DBSQLiteValues = await db.query(
              `select * from ${this.table}`
            );
            return products.values as sold[];
          }
        );
      }
  


    
    async getCounts(): Promise<any> {
        return this._databaseService.executeQuery<any>(
          async (db: SQLiteDBConnection) => {

            var count:DBSQLiteValues= await db.query(`select count(*) from ${this.table}`);
            return count.values[0];
          }
        );
      }
    async create(data: sold) {
      return this._databaseService.executeQuery<any>(
        async (db: SQLiteDBConnection) => {
          let sqlcmd: string = `insert into ${this.table} (whole_sold_id,product_id,quantity) values (?, ?, ?)`;
          let values: Array<any> = [data.whole_sold_id,data.product_id,data.quantity];
          let ret: any = await db.run(sqlcmd, values);
          if (ret.changes.lastId > 0) {
            return ret.changes as sold;
          } else {
            return [];
          }
        }
      );
    }
  
    async update(data: wholesold) {
      return this._databaseService.executeQuery<any>(
        async (db: SQLiteDBConnection) => {
          let sqlcmd: string = `update ${this.table} set cash = ?, where id = ?`;
          let values: Array<any> = [data.cash, data.id];
          let ret: any = await db.run(sqlcmd, values);
          if (ret.changes.changes > 0) {
            return await this.getById(data.id);
          } else {
            return [];
          }
        }
      );
    }
  
    async getById(id: number): Promise<wholesold> {
      return this._databaseService.executeQuery<any>(
        async (db: SQLiteDBConnection) => {
          let sqlcmd: string = `select * from ${this.table} where id = ? limit 1`;
          let values: Array<any> = [id];
          let ret: any = await db.query(sqlcmd, values);
          if (ret.values.length > 0) {
            return ret.values[0] as wholesold;
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
  