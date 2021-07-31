import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { HttpService } from '../../services/http.service';
import * as _ from 'lodash';
import { ChangeDetectorRef,NgZone } from '@angular/core';
@Component({
  selector: 'app-sale-input',
  templateUrl: './sale-input.page.html',
  styleUrls: ['./sale-input.page.scss'],
})
export class SaleInputPage implements OnInit {
  sale: any;
  barcode: any;
  total: any;

  constructor(private ngZone: NgZone,public http: HttpService,private ref: ChangeDetectorRef) {
    this.total = 0;
    this.sale = Array();
  }
codeinputchange(){
  this.codeaction().then(() =>{
  });
}
chechinArray(value){
}
 async codeaction() {
    await this.http.getData(`get-productbycode.php?code=${this.barcode}`).subscribe({
      next: data =>{
        if(data && !Array.isArray(data)){
          this.sale.push({
            data,
          });
        }
        delete(this.barcode);
      },error: err =>{
        delete(this.barcode);
        console.log(err);
      }
    });
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
      text: 'You won\'t be able to revert this!',
      icon: 'warning',

      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sale.splice(i,1);
        // this.totalcalculation();
        Swal.fire('Deleted!', 'Successfully removed', 'success');
      }
    });
  }
  viewProduct(id){
    alert(id);
  }
  totalcalculator(){
    let tmp = 0;
    _.forEach(this.sale,value =>{
      console.log(value);
      tmp += (value.data.price.price * value.data.quantity);
    });
    return tmp;
  }
}
