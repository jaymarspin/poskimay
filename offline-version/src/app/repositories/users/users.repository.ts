import {
  DBSQLiteValues,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { Injectable } from "@angular/core";
import { DatabaseService } from "../../services/database.service";
import { User } from "src/app/models/user";

@Injectable()
export class UserRepository {
  constructor(private _databaseService: DatabaseService) {}

  async getUser(): Promise<User[]> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        var products: DBSQLiteValues = await db.query("select * from users");
        return products.values as User[];
      }
    );
  }

  async createUser(user: User) {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string =
          "insert into users (name, username, password, restrictions) values (?, ?, ?, ?)";
        let values: Array<any> = [
          user.name,
          user.username,
          user.password,
          user.restrictions,
        ];
        let ret: any = await db.run(sqlcmd, values);
        if (ret.changes.lastId > 0) {
          return ret.changes as User;
        }
        throw Error("create user failed");
      }
    );
  }

  async login(user: User): Promise<User> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string =
          "select * from users where username = ? and password = ?";
        let values: Array<any> = [user.username, user.password];
        let ret: any = await db.query(sqlcmd, values);
        if (ret.values.length > 0) {
          return ret.values[0] as User;
        }
        throw Error(new Error().message);
      }
    );
  }

  async updateUser(user: User) {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string =
          "update users set name = ?, username = ?, password = ?,restrictions = ?, where id = ?";
        let values: Array<any> = [
          user.name,
          user.username,
          user.password,
          user.restrictions,
          user.id,
        ];
        let ret: any = await db.run(sqlcmd, values);
        if (ret.changes.changes > 0) {
          return await this.getUserById(user.id);
        }
        throw Error("update user failed");
      }
    );
  }

  async getUserById(id: number): Promise<User> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        let sqlcmd: string = "select * from users where id = ? limit 1";
        let values: Array<any> = [id];
        let ret: any = await db.query(sqlcmd, values);
        if (ret.values.length > 0) {
          return ret.values[0] as User;
        }
        throw Error("get user by id failed");
      }
    );
  }

  async deleteUserById(id: number): Promise<void> {
    return this._databaseService.executeQuery<any>(
      async (db: SQLiteDBConnection) => {
        await db.query(`delete from users where id = ${id};`);
      }
    );
  }
}
