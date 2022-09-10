import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { Router } from "@angular/router";
import { ProductActionsComponent } from "../product-actions/product-actions.component";
import { GlobalService } from "../../services/global.service";
import { HttpService } from "../../services/http.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  employee: any;
  products: any;
  productscount: any;

  page: number;
  limit: number;
  pagebtntmp: any;
  pagebtn: any;

  defaultImage = "https://www.placecage.com/1000/1000";
  image = "https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg";
  categories: any;
  category: any;
  searchVal: string;
  constructor(
    public global: GlobalService,
    public http: HttpService,
    private router: Router,
    public popoverController: PopoverController
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
  getCategory() {
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
    this.loadData();
  }
  async search() {
    await this.loadData();
  }
  async ionViewDidEnter() {
    await this.loadData();
    await this.getCategory();
  }
  loadData() {
    this.global.loading = true;
  }
  addemployee() {}

  pager(page) {
    this.page = page;
    this.loadData();
  }

  gofurther(link) {
    this.router.navigate([link]);
  }
  async viewimg(src) {
    const images: any = new Array();
    await images.push({ src });
    console.log(images);
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
