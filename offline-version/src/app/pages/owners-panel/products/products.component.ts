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
  data: any;
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
    this.p = 1;
    this.searchVal = null
    this.loadData()

    // const options = {
    //   includeScore: true,
    //   // Search in `author` and in `tags` array
    //   keys: ['category_id']
    // }
    
    // const fuse = new Fuse(this.productsPersist, options)
    // this.products = new Array<Product>()
    // const result = fuse.search(this.category+'')
 
    // _.forEach(result,value => {
    //   this.products.push(value.item)
    // });


  
  }
  async search() {
    this.category = null
    this.p = 1;
    this.loadData()
     
  }
  async ionViewDidEnter() {
    await this.loadData();
    await this.getCategory();
  }


  pageChange(e: any){
  
    this.p = e
      
    
     this.loadData()
  }
  async loadData() {
    this.global.loading = true;
    this.products = await this.productRepository
      .getProductsRelations(((20 * (this.p - 1))) - 1,this.category,this.searchVal)
      .then((res) => {
         this.productsPersist = res
         console.log(res)
        return res;
      });
 
   

    this.productscount = await this.productRepository.getCounts(this.category,this.searchVal).then(res => res)
   
    this.productscount = parseInt(Object.values(this.productscount)[0]+'')
    console.log(this.productscount)
 
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
    this.p = 1;
    this.searchVal = null;
    this.category = null;
    await this.loadData();
    await this.getCategory();
  }
}
