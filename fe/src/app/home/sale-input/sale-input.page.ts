import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { HttpService } from '../../services/http.service';
import * as _ from 'lodash';
import { ChangeDetectorRef } from '@angular/core';

import { ProductViewComponent } from './components/product-view/product-view.component';
import { GlobalService } from '../../services/global.service';

import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-sale-input',
  templateUrl: './sale-input.page.html',
  styleUrls: ['./sale-input.page.scss'],
})
export class SaleInputPage implements OnInit {
  barcode: any;
  total: any;
  buyaction: any;
  customercash: any;
  constructor(public global: GlobalService,
    private popoverController: PopoverController,
    public http: HttpService,
    private ref: ChangeDetectorRef) {
    this.total = 0;
    this.buyaction = false;
  }
codeinputchange(){
  this.codeaction().then(() =>{
  });
}
 async codeaction() {
    await this.http.getData(`get-productbycode.php?code=${this.barcode}`).subscribe({
      next: data =>{
        if(data && !Array.isArray(data)){
          this.global.sales.push({
            data,
          });

        }else{
          Swal.fire({
            backdrop: false,
            icon: 'error',
            title: 'Oops...',
            text: 'Code not found',
            footer: ''
          });
        }
        delete(this.barcode);
      },error: err =>{
        delete(this.barcode);
        console.log(err);
      }
    });
  }
  async presentPopover(ev: any,item) {
    const popover = await this.popoverController.create({
      component: ProductViewComponent,
      cssClass: 'popover',
      componentProps: {item},
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  ngOnInit() {
    // this.sqlite.create({
    //   name: 'data.db',
    //   location: 'default'
    // })
    //   .then((db: SQLiteObject) => {
    //     db.executeSql('create table danceMoves(name VARCHAR(32))', [])
    //       .then(() => console.log('Executed SQL'))
    //       .catch(e => console.log(e));
    //   })
    //   .catch(e => console.log(e));
  }
  delete(i) {
    Swal.fire({
      title: 'Are you sure?',
      backdrop: false,
      text: 'You can just add it back',
      icon: 'warning',

      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.global.sales.splice(i,1);
        // this.totalcalculation();
      }
    });
  }
  totalcalculator(){
    let tmp = 0;
    _.forEach(this.global.sales,value =>{
      tmp += (value.data.price.price * value.data.quantity);
    });
    return tmp;
  }
  buynow(){
    if(this.buyaction === false){
      if(this.customercash >= this.totalcalculator()){
        this.buyaction = true;
      const data ={
        sold: this.global.sales,
        cash: this.customercash,
        employeeid: localStorage.getItem(`id`),
    };
      this.http.postData(`add-sold.php`,data).subscribe({
        next: res =>{
          if(res.body.message === 'success'){
          }
          this.global.sales = new Array();
          delete(this.customercash);
          this.buypause();
        },error: err =>{
          this.buypause();
          console.log(err);
        }
      });
      }else{
        Swal.fire({
          backdrop: false,
          icon: 'error',
          title: 'Oops...',
          text: 'Not enough money',
          footer: ''
        });
      }
    }
  }
  buypause(){
    setTimeout(() =>{
      this.buyaction = false;
    },3000);
  }


}
