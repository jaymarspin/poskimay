import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { Router } from "@angular/router";
import { ProductActionsComponent } from "../product-actions/product-actions.component";
import { GlobalService } from "../../services/global.service";
import { HttpService } from "../../services/http.service";
import Swal from "sweetalert2";
import { ProductRepository } from "src/app/repositories/product.repository";
import { productImageRepository } from "src/app/repositories/product_images/product_images.repository";
import { Product, ProductImage } from "src/app/models/Product";
import { categoryRepository } from "src/app/repositories/category/category.repository";
import Fuse from 'fuse.js'
import * as _ from 'lodash'
@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  employee: any;
  products: Product[];
  productscount: any;

  page: number;
  limit: number;
  pagebtntmp: any;
  pagebtn: any;

  defaultImage = "https://www.placecage.com/1000/1000";
  image = "https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg";
  categories: any;
  productsPersist: Product[];
  category: any;
  searchVal: string;
  p: number = 1;
  constructor(
    public global: GlobalService,
    public http: HttpService,
    private router: Router,
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
    this.searchVal = "";
  }

  async presentPopover(ev: any, id: any, availability: any) {
    const popover = await this.popoverController.create({
      component: ProductActionsComponent,
      cssClass: "my-custom-class",
      event: ev,
      componentProps: {
        id,
        availability,
      },
      translucent: true,
    });
    await popover.present();
    await popover.onDidDismiss();
    this.loadData();
  }

  ngOnInit() {}
  ionViewWillEnter() {
    this.global.adminTeller = new Array();
    this.global.adminTeller.push("Products");
  }
  async getCategory() {

    this.categories = await this.categoryRepository.get().then((res) => res);
    // this.http.getData("get-categories.php").subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     const result = JSON.parse(JSON.stringify(data));
    //     this.categories = result;
    //     console.log(this.categories);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }

  
  choosenCategory() {
    this.page = 1;

    const options = {
      includeScore: true,
      // Search in `author` and in `tags` array
      keys: ['category_id']
    }
    
    const fuse = new Fuse(this.productsPersist, options)
    this.products = new Array<Product>()
    const result = fuse.search(this.category+'')
 
    _.forEach(result,value => {
      this.products.push(value.item)
    });


  
  }
  async search() {

    this.page = 1;

    const options = {
      includeScore: true,
      // Search in `author` and in `tags` array
      keys: ['category_id','name']
    }
    
    const fuse = new Fuse(this.productsPersist, options)
    this.products = new Array<Product>()
    const result = fuse.search(this.searchVal)
 
    _.forEach(result,value => {
      this.products.push(value.item)
    });

     
  }
  async ionViewDidEnter() {
    await this.loadData();
    await this.getCategory();
  }
  async loadData() {
    this.global.loading = true;
    this.products = await this.productRepository
      .getProductsRelations()
      .then((res) => {
         this.productsPersist = res
         console.log(res)
        return res;
      });
  }
  addemployee() {}

  pager(page) {
    this.page = page;
    this.loadData();
  }

  gofurther(link) {
    this.router.navigate([link]);
  }
   viewimg(src) {
    const images: any = new Array();
     images.push({ src });
  
    this.global.lightBoxOpen(images, 0);
  }
  async refresh() {
    this.page = 1;
    this.searchVal = "";
    this.category = 0;
    await this.loadData();
    await this.getCategory();
  }
}
