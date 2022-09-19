import { Component, OnInit } from '@angular/core';

import { ProductViewComponent } from '../product-view/product-view.component';
import { GlobalService } from '../../../../services/global.service';
import { HttpService } from '../../../../services/http.service';
import { PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { Product } from 'src/app/models/Product';
import { ProductRepository } from 'src/app/repositories/product.repository';
import { productImageRepository } from 'src/app/repositories/product_images/product_images.repository';
import { categoryRepository } from "src/app/repositories/category/category.repository";
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

  p: number = 1;

  productsPersist: Product[];
  constructor(
    public global: GlobalService,
    public http: HttpService,
    public popoverController: PopoverController,
    private productRepository: ProductRepository,
    private productImages: productImageRepository,
    private categoryRepository: categoryRepository
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
  async getCategory() {
    this.categories = await this.categoryRepository.get().then((res) => res);
  }

  choosenCategory(id) {
    this.category = id;
    this.searchVal = '';
    this.loadData();
  }

  async presentPopover(ev: any, item) {
    const popover = await this.popoverController.create({
      component: ProductViewComponent,
      cssClass: 'productview',
      componentProps: { item },
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async loadData() {
    // this.global.loading = true;
    // let link = `get-products-nolimit.php?page=${this.page}&category=${this.category}`;
    // if (this.searchVal !== '') {
    //   link = `search-products-nolimit.php?page=${this.page}&search=${this.searchVal}`;
    // }

    // this.http.getData(link).subscribe({
    //   next: (data) => {
    //     this.products = new Array();

    //     const result = JSON.parse(JSON.stringify(data));
    //     console.log(result);
    //     this.productscount = result.products_count;
    //     const length = result.products.length;

    //     this.pagebtntmp = this.productscount / this.limit;
    //     this.pagebtn = Array();
    //     for (let ii = 1; ii < this.pagebtntmp + 1; ii++) {
    //       this.pagebtn.push(ii);
    //     }
    //     for (let iii = 0; iii < length; iii++) {
    //       this.products.push(result.products[iii]);
    //       console.log(this.products);
    //     }
    //     this.global.loading = false;
    //   },
    //   error: (error) => {
    //     console.log(error);
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: error.message,
    //       footer: ' ',
    //     });
    //   },
    // });

 
      this.global.loading = true;
      this.products = await this.productRepository
        .getProductsRelations(((20 * (this.p - 1))) - 1,this.category,this.searchVal, 50)
        .then((res) => {
           this.productsPersist = res
           console.log(res)
          return res;
        });
   
     
  
      this.productscount = await this.productRepository.getCounts(this.category,this.searchVal).then(res => res)
     
      this.productscount = parseInt(Object.values(this.productscount)[0]+'')
      console.log(this.productscount)
 
  }
  
  refresh() {
    this.searchVal = '';
    this.page = 1;
    this.category = 0;
    this.loadData();
  }
  search() {
    this.page = 1;
    this.category = 0;
    this.loadData();
  }
}
