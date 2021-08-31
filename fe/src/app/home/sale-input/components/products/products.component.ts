import { Component, OnInit } from '@angular/core';

import { ProductViewComponent } from '../product-view/product-view.component';
import { GlobalService } from '../../../../services/global.service';
import { HttpService } from '../../../../services/http.service';
import { PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  employee: any;
  products: any;
  productscount;

  page: number;
  limit: number;
  pagebtntmp: any;
  pagebtn: any;

  defaultImage = 'https://www.placecage.com/1000/1000';
  categories: any;
  category: any;
  searchVal: any;
  constructor(
    public global: GlobalService,
    public http: HttpService,
    public popoverController: PopoverController
  ) {
    this.products = new Array();
    this.pagebtn = new Array();
    this.categories = new Array();

    this.page = 1;
    this.limit = 10;
    this.category = 0;
    this.searchVal = '';
  }

  async ngOnInit() {
    await this.loadData();
    await this.getCategory();

  }
  getCategory(){
    this.http.getData(
      'get-categories.php'
    ).subscribe({
      next: data =>{
        console.log(data);
        const result = JSON.parse(JSON.stringify(data));
        this.categories = result;
      },error: err =>{
        console.log(err);
      }
    });
  }

  choosenCategory(id){
    this.category = id;
    this.searchVal = '';
    this.loadData();
  }

  async presentPopover(ev: any,item) {
    const popover = await this.popoverController.create({
      component: ProductViewComponent,
      cssClass: 'productview',
      componentProps: {item},
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  loadData() {
    this.global.loading = true;
    let link = `get-products.php?}
    &limit=${this.limit}
    &page=${this.page}
    &category=${this.category}`;
    if(this.searchVal !== ''){
      link = `search-products.php?}
      &limit=${this.limit}
      &page=${this.page}
      &search=${this.searchVal}`;
    }
    this.http
      .getData(link)
      .subscribe({
        next: (data) => {
          this.products = new Array();

          const result = JSON.parse(JSON.stringify(data));
          console.log(result);
          this.productscount = result.products_count;
          const length = result.products.length;

          this.pagebtntmp = this.productscount / this.limit;
          this.pagebtn = Array();
          for (let ii = 1; ii < this.pagebtntmp + 1; ii++) {
            this.pagebtn.push(ii);
          }
          for (let iii = 0; iii < length; iii++) {
            this.products.push(result.products[iii]);
            console.log(this.products);
          }
          this.global.loading = false;
        },
        error: (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
            footer: ' ',
          });
        },
      });
  }
  refresh(){
    this.searchVal = '';
    this.page = 1;
    this.category = 0;
    this.loadData();
  }
  search(){
    this.page = 1;
    this.category = 0;
    this.loadData();

  }

}
