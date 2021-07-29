import { Component, OnInit } from '@angular/core';

import {ProductViewComponent} from '../product-view/product-view.component'
import {GlobalService} from '../../../../services/global.service'
import {HttpService} from '../../../../services/http.service'
import { PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  employee:any
  products:any
  products_count

  page:number
   limit:number
   pagebtntmp:any
   pagebtn:any
  constructor(public global: GlobalService,public http: HttpService,public popoverController: PopoverController) {
    this.products = new Array()
    this.pagebtn = new Array()

     this.page = 1
     this.limit = 10

  }

  ngOnInit() {
    this.loadData()
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ProductViewComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  loadData(){

    // ?limit="+this.limit+"&page="+pager+"&filter="+this.filter
    this.global.loading = true
    this.http.getData("get-products.php?id="+localStorage.getItem("business_id")+"&limit="+this.limit+"&page="+this.page).subscribe({
      next: data =>{

        this.products = new Array()

        let result = JSON.parse(JSON.stringify(data));
        console.log(result)
        this.products_count = result.products_count
         let length = result.products.length

         this.pagebtntmp =  this.products_count / this.limit
         this.pagebtn = Array()
         for(var i = 1;i < this.pagebtntmp + 1;i++){
           this.pagebtn.push(i)
         }
            for(var i =0;i < length;i++){
          this.products.push(result.products[i])
          console.log(this.products)
      }
      this.global.loading = false

    },error: error =>{
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
        footer: ' '
      })
    }
    })


  }

}
