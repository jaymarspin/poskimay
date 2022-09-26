import {
    DBSQLiteValues,
    SQLiteDBConnection,
  } from "@capacitor-community/sqlite";
  import { Injectable } from "@angular/core";
  import { DatabaseService } from "../../services/database.service"; 
import { sold, wholesold } from "src/app/models/sold";
import { ProductRepository } from "../product.repository";
import { soldRepository } from "../sold/sold.repository";
import { response } from "src/app/models/common";
import { productPriceRepository } from "../product_prices/product_prices.repositories";
import { sort } from 'fast-sort';
  @Injectable()
  export class wholesoldRepository {
    table = "whole_sold";
    constructor(private _databaseService: DatabaseService,private product: ProductRepository,private sold: soldRepository,private price: productPriceRepository) {}
  
    async get(): Promise<wholesold[]> {
      return this._databaseService.executeQuery<any>(
        async (db: SQLiteDBConnection) => {
          var products: DBSQLiteValues = await db.query(
            `select * from ${this.table}`
          );
          return await products.values as wholesold[];
        }
      );

    }

    async getWithRelations(offset?: number,limit?: number): Promise<wholesold[]> {
        return this._databaseService.executeQuery<any>(
          async (db: SQLiteDBConnection) => {
            var wholesolds: DBSQLiteValues = await db.query(
              `select * from ${this.table} order by id desc`
            );
  
            const tmp = new Array<wholesold>();
            
            wholesolds.values.map(async (value: wholesold, i) =>{
              const sold = await this.sold.getByWholesoldId(value.id).then(res => res)
              const tmpsold = new Array<sold>();
              sold.forEach(async (value,i) =>{
                const product = await this.product.getProductById(value.product_id ).then(res => res)
                const price = await this.price.getByProductId(value.product_id ).then(res => res)
                tmpsold.push({
                  whole_sold_id: value.whole_sold_id,
                  product_id: value.product_id,
                  quantity: value.quantity,
                  price_id: value.price_id,
                  product: product,
                  price: price
                })
                
              })
              
              const soldTmp: wholesold = {
                cash: value.cash,
                id: value.id,
                sold: tmpsold,
                extras: value.extras,
                createdAt: value.createdAt
  
              };

              // const product = await this.product.getProductById( )
              
              tmp.push(soldTmp)
  
          })

         
            return tmp as wholesold[];
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
    async create(data: wholesold) : Promise<response> {
      return this._databaseService.executeQuery<any>(
        async (db: SQLiteDBConnection) => {
          let sqlcmd: string = `insert into ${this.table} (cash,extras) values (?, ?)`;
          let values: Array<any> = [data.cash,JSON.stringify(data.extras)];
          let ret: any = await db.run(sqlcmd, values);
          if (ret.changes.lastId > 0) {

            
            return ret.changes as response;
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
  