import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductActionsComponent } from '../product-actions/product-actions.component';
import { GlobalService } from '../../services/global.service';
import { HttpService } from '../../services/http.service';
import Swal from 'sweetalert2';
import * as DateRangePicker from 'tiny-date-picker';
@Component({
  selector: 'app-sold',
  templateUrl: './sold.component.html',
  styleUrls: ['./sold.component.scss'],
})
export class SoldComponent implements OnInit {
  employee: any;
  sold: any;
  soldcount: any;

  page: number;
  limit: number;
  pagebtntmp: any;
  pagebtn: any;

  defaultImage = 'https://www.placecage.com/1000/1000';
  image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';

  constructor(
    public global: GlobalService,
    public http: HttpService,
    private router: Router,
    public popoverController: PopoverController
  ) {
    this.sold = new Array();
    this.pagebtn = new Array();

    this.page = 1;
    this.limit = 10;
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ProductActionsComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    // ?limit="+this.limit+"&page="+pager+"&filter="+this.filter
    this.global.loading = true;
    this.http
      .getData(
        `get-sold.php?
          limit=${this.limit}
          &page=${this.page}`
      )
      .subscribe({
        next: (data) => {
          this.sold = new Array();

          const result = JSON.parse(JSON.stringify(data));
          this.soldcount = result.sold_count;
          const length = result.sold.length;

          this.pagebtntmp = this.soldcount / this.limit;
          this.pagebtn = Array();
          for (let ii = 1; ii < this.pagebtntmp + 1; ii++) {
            this.pagebtn.push(ii);
          }
          for (let i = 0; i < length; i++) {
            this.sold.push(result.sold[i]);
            console.log(this.sold);
          }
          this.global.loading = false;
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
            footer: ' ',
          });
        },
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
  async viewimg(src){
  const images: any = new Array();
  await images.push({src});
  console.log(images);
  this.global.lightBoxOpen(images,0);
}
}
