import { Component, AfterViewInit } from '@angular/core';
import { SQLiteService } from '../../services/sqlite.service';
import { DetailService } from '../../services/detail.service';
import { dataToImport94 } from '../utils/import-json-utils';
import { Dialog } from '@capacitor/dialog';

@Component({
  selector: 'app-testjson94',
  templateUrl: 'testjson94.page.html',
  styleUrls: ['testjson94.page.scss']
})
export class Testjson94Page implements AfterViewInit {
  sqlite: any;
  platform: string;
  handlerPermissions: any;
  initPlugin: boolean = false;

  constructor(private _sqlite: SQLiteService,
              private _detailService: DetailService) {}

  async ngAfterViewInit() {
    const showAlert = async (message: string) => {
      await Dialog.alert({
      title: 'Error Dialog',
      message: message,
      });
    };
    // Initialize the CapacitorSQLite plugin
    try {
      await this.runTest();
      document.querySelector('.sql-allsuccess').classList
      .remove('display');
      console.log("$$$ runTest was successful");
    } catch (err) {
      document.querySelector('.sql-allfailure').classList
      .remove('display');
      console.log("$$$ runTest failed");
      await showAlert(err.message);
    }
  }


  async runTest(): Promise<void> {
    try {
      let result: any = await this._sqlite.echo("Hello World");

      // ************************************************
      // Import Json Object Issue#94
      // ************************************************
      // test Json object validity
      result = await this._sqlite
                            .isJsonValid(JSON.stringify(dataToImport94));
      if(!result.result) {
        return Promise.reject(new Error("IsJson failed"));
      }
      // full import
      result = await this._sqlite
                          .importFromJson(JSON.stringify(dataToImport94));    
      if(result.changes.changes === -1 ) return Promise.reject(new Error("ImportFromJson 'full' failed"));

      // ************************************************
      // Export Json Object from an Existing Database
      // ************************************************

      // create the connection to the database
      const db = await this._sqlite
                        .createConnection("db-from-json94", false,
                                          "no-encryption", 1);
      if(db === null) return Promise.reject(new Error("CreateConnection db-from-json94 failed"));

      // open db testNew
      await db.open();

      // export json
      let jsonObj: any = await db.exportToJson('full');
      
       // test Json object validity
      result = await this._sqlite
                            .isJsonValid(JSON.stringify(jsonObj.export));
      if(!result.result) {
        return Promise.reject(new Error("IsJsonValid export 'full' failed"));
      }
      // close the connection
      await this._sqlite.closeConnection("db-from-json94"); 
      this._detailService.setExportJson(false);

      return Promise.resolve();
    } catch (err) {
      await this._sqlite.closeConnection("db-from-json94"); 
      this._detailService.setExportJson(false);
      return Promise.reject(err);
    }
  }

}
