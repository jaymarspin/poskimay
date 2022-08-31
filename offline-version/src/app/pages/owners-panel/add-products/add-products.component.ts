import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { HttpService } from '../../services/http.service';
import { PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent implements OnInit {
  productname: any;
  stocks: any;
  barcode: any;
  category: any;
  price: any;
  description: any;

  categories;

  imgsrc: any;
  base64data: any;
  newbase64: boolean;

  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  id: any;

  defaultImage = 'https://www.placecage.com/1000/1000';
  image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';

  constructor(
    private imageCompress: NgxImageCompressService,
    private location: Location,
    public http: HttpService,
    private popoverController: PopoverController,
    public global: GlobalService,
    private snapshot: ActivatedRoute
  ) {
    this.imgsrc = 'assets/icon/photo.svg';
    this.barcode = '';
    this.description = '';
    this.newbase64 = false;
  }
  promiseCompressedImg = () =>
    new Promise((resolve, reject) => {
      this.imageCompress.uploadFile().then(({ image, orientation }) => {
        // console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

        this.imageCompress
          .compressFile(image, orientation, 100, 100)
          .then((result) => {
            resolve(result);
            this.newbase64 = true;
            this.base64data = result;
          });
      });
    });

  ngOnInit() {
    if (this.snapshot.snapshot.paramMap.get('id')) {
      this.id = parseInt(this.snapshot.snapshot.paramMap.get('id'), 10);
      this.getProduct();
    } else {
      this.id = 0;
    }
    this.loadCategory();
  }
  ionViewWillEnter() {
    if (this.global.adminTeller.length === 0) {
      this.global.adminTeller.push('Products');
    }
    this.global.adminTeller.push('> Add products');
  }

  getProduct() {
    this.http.getData(`get-product.php?id=${this.id}`).subscribe({
      next: (data) => {
        const result = JSON.parse(JSON.stringify(data));
        this.productname = result.product_name;
        this.barcode = result.barcode;
        this.price = result.price.price;
        this.stocks = result.stocks.stocks_count;
        this.category = `${result.category.id}`;
        this.description = result.description;
        this.base64data = this.http.server + result.image.name50;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  loadCategory() {
    this.global.loading = true;
    this.http.getData(`get-product-category.php`).subscribe({
      next: (data) => {
        this.categories = data;
        this.global.loading = false;
      },
      error: (error) => {
        this.global.loading = false;
        console.error('There was an error!', error);
      },
    });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: AddCategoryComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    await popover.present();

    await popover.onDidDismiss().then((data: any) => {
      this.loadCategory();
    });
  }

  async next() {
    if (this.productname && this.stocks && this.category && this.price) {
      this.global.loading = true;
      let link = `add-product.php`;
      if (this.id !== 0) {
        link = `edit-product.php`;
      }
      const data = {
        productname: this.productname,
        stocks: this.stocks,
        category: this.category,
        barcode: this.barcode,
        price: this.price,
        description: this.description,
        base64data: this.base64data,
        newbase64: this.newbase64,
        id: this.id,
      };

      await this.http.postData(link, data).subscribe({
        next: (datas) => {
          this.global.loading = false;
          if (datas.body.message === 'success') {
            Swal.fire('Good job!', 'Successfully Added!', 'success').then(
              () => {
                delete this.productname;
                delete this.stocks;
                delete this.category;
                delete this.barcode;
                delete this.price;
                delete this.base64data;
              }
            );
            this.location.back();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        },
        onerror: (error) => {
          console.log(error);
          this.global.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            footer: ' ',
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please complete the fields',
        footer: ' ',
      });
    }
  }

  open(event) {
    console.log(event);
  }
  ionViewWillLeave() {
    this.global.adminTeller.pop();
  }
}
