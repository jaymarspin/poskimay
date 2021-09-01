import { Component, OnInit } from '@angular/core';
import Localbase from 'localbase';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
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
