/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private sqlite: SQLite,private platform: Platform,) {
   }
   ngOnInit(): void {
    this.initializeApp();
   }
   initializeApp() {
    this.platform.ready().then(() => {
      this.createDB();
    });
  }
  createDB(){
    const conn = this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('create table employees(fname VARCHAR(42),lname VARCHAR(42),address VARCHAR(100),contact VARCHAR(42),active VARCHAR(42),date_updated DATETIME,date_created DATETIME)')
        .then(() => {console.log('Executed SQL');}).catch(e => console.log(e));

    })
    .catch(e => console.log(e));

  }
  // async ngOnInit() {
  //   const db = new Localbase('db');
  //   // db.collection('trial').delete();
  //   let time = 1209600;
  //   // db.collection('users').add({
  //   //   id: 1,
  //   //   time,
  //   //   age: 47
  //   // });
  //   db.collection('trial')
  //     .get()
  //     .then(async (document) => {
  //       console.log(document);
  //       if (document.length > 0) {
  //         alert('may laman');
  //         await db
  //           .collection('trial')
  //           .doc({ id: 1 })
  //           .get()
  //           .then((data) => {
  //             console.log(data.time);
  //             time = parseInt(data.time, 10);
  //           });
  //         const c = setInterval(() => {
  //           if (time < 0) {
  //             clearInterval(c);
  //           }
  //           time -= 1;
  //           db.collection('trial').doc({ id: 1 }).update({
  //             time,
  //           });
  //         }, 1000);
  //       } else {
  //         await db.collection('trial').add({
  //           id: 1,
  //           time,
  //           age: 47,
  //         });
  //         const c = setInterval(() => {
  //           if (time < 0) {
  //             clearInterval(c);
  //           }
  //           time -= 1;
  //           db.collection('trial').doc({ id: 1 }).update({
  //             time,
  //           });
  //         }, 1000);
  //       }
  //     });
  //   // const c = setInterval(() =>{
  //   //   if(time < 0){
  //   //     clearInterval(c);
  //   //   }
  //   //   time -= 1;
  //   //   db.collection('users').doc({ id: 1 }).update({
  //   //     time
  //   //   });
  //   // },1000);
  // }
}

// ionic build

// npx cap add electron
// npx cap open electron

//npm config set legacy-peer-deps true adding android
