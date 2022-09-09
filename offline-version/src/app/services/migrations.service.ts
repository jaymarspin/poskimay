import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { DatabaseService } from "./database.service";
import { SQLiteService } from "./sqlite.service";

export const createSchemaProducts: string = `

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  username TEXT DEFAULT '',
  password TEXT NOT NULL,
  restrictions TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
  );


CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  category_id TEXT,
  isAvailable BOOLEAN NOT NULL CHECK (isAvailable IN (0, 1)),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  

  CREATE TABLE IF NOT EXISTS products_stocks (
    id INTEGER PRIMARY KEY NOT NULL,
    product_id TEXT NOT NULL,
    stocks_count NOT NULL, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    );

    CREATE TABLE IF NOT EXISTS product_image (
      id INTEGER PRIMARY KEY NOT NULL,
      product_id TEXT NOT NULL,
      name TEXT NOT NULL, 
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
      );

      CREATE TABLE IF NOT EXISTS product_price
      (id INTEGER PRIMARY KEY NOT NULL,
        product_id TEXT NOT NULL,
        price NUMERIC NOT NULL, 
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        );

 
    

  
`;
// DROP TABLE products
//DROP TABLE products
// ALTER TABLE users
// ADD COLUMN restrictions TEXT NOT NULL;
// export const createSchemaTest: string = `
// CREATE TABLE IF NOT EXISTS test (
//   id INTEGER PRIMARY KEY NOT NULL,
//   name TEXT NOT NULL
// );
// `;

@Injectable()
export class MigrationService {
  constructor(
    private sqliteService: SQLiteService,
    private databaseService: DatabaseService
  ) {}

  async migrate(): Promise<any> {
    await this.createTable().then(() => {
      const db = this.sqliteService.createConnection(
        environment.databaseName,
        false,
        "no-encryption",
        1
      );

      db.then((res) => {
        res.open().then(() => {
          res.exportToJson("full").then((cap) => {
            console.log(cap);
          });
        });
      });
    });
  }

  async createTable(): Promise<any> {
    await this.databaseService.executeQuery(async (db) => {
      await db.execute(createSchemaProducts);
    });
  }

  async createTestTable(): Promise<void> {
    console.log(`going to create a connection`);
    const db = await this.sqliteService.createConnection(
      environment.databaseName,
      false,
      "no-encryption",
      1
    );
    console.log(`db ${JSON.stringify(db)}`);
    await db.open();
    console.log(`after db.open`);
    let query = `
            CREATE TABLE IF NOT EXISTS test (
              id INTEGER PRIMARY KEY NOT NULL,
              name TEXT NOT NULL
            );
            `;
    console.log(`query ${query}`);

    const res: any = await db.execute(query);
    console.log(`res: ${JSON.stringify(res)}`);
    await this.sqliteService.closeConnection(environment.databaseName);
    console.log(`after closeConnection`);
  }
}
