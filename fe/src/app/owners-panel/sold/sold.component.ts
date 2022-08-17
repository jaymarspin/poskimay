import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SoldActionsComponent } from '../sold-actions/sold-actions.component';
import { GlobalService } from '../../services/global.service';
import { HttpService } from '../../services/http.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-sold',
  templateUrl: './sold.component.html',
  styleUrls: ['./sold.component.scss'],
})
export class SoldComponent implements OnInit {
  employee: any;
  sold: any;
  soldcount: any;

  sold2: any;
  soldcount2: any;

  page: number;
  limit: number;
  pagebtntmp: any;
  pagebtn: any;

  page2: number;
  limit2: number;
  pagebtntmp2: any;
  pagebtn2: any;

  defaultImage = 'https://www.placecage.com/1000/1000';
  image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';

  campaignOne: FormGroup;
  soldval: any;
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

    this.pagebtn2 = new Array();

    this.page2 = 1;
    this.limit2 = 10;
    const today = new Date();
    this.soldval = 'sold';
    const month = today.getMonth();
    const year = today.getFullYear();
    const day = today.getUTCDate();
    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, day)),
      end: new FormControl(new Date(year, month, day)),
    });
  }

  async presentPopover(ev: any, id, timestamp) {
    const popover = await this.popoverController.create({
      component: SoldActionsComponent,
      cssClass: 'my-custom-class',
      componentProps: { id, timestamp },
      event: ev,
      translucent: true,
    });
    await popover.present();
  }
  async getInitialDate() {
    return this.campaignOne.value;
  }
  ngOnInit() {
    this.getInitialDate().then((data) => {
      this.loadData(data);
    });
  }
  loadData(dates) {
    // ?limit="+this.limit+"&page="+pager+"&filter="+this.filte
    if (dates.end && dates.start) {
      this.global.loading = true;
      this.http
        .getData(
          `get-sold.php?
          limit=${this.limit}
          &page=${this.page}
          &start=${this.global.formattedDate(dates.start)},
          &end=${this.global.formattedDate(dates.end)}`
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
  }
  loadData2(dates) {
    if (dates.start && dates.end) {
      this.global.loading = true;
      this.http
        .getData(
          `get-bulk-sold.php?
        limit=${this.limit2}
        &page=${this.page2}
        &start=${this.global.formattedDate(dates.start)},
        &end=${this.global.formattedDate(dates.end)}`
        )
        .subscribe({
          next: (data) => {
            this.sold2 = new Array();
            const result = JSON.parse(JSON.stringify(data));
            this.soldcount2 = result.sold_count;
            console.log(result);
            const length = result.sold.length;
            this.pagebtntmp2 = this.soldcount2 / this.limit2;
            this.pagebtn2 = Array();
            for (let ii = 1; ii < this.pagebtntmp2 + 1; ii++) {
              this.pagebtn2.push(ii);
            }
            for (let i = 0; i < length; i++) {
              this.sold2.push(result.sold[i]);
            }
            this.global.loading = false;
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
  pager(page) {
    this.page = page;
    this.getInitialDate().then((data) => {
      this.loadData(data);
    });
  }
  pager2(page) {
    this.page2 = page;
    this.getInitialDate().then((data) => {
      this.loadData2(data);
    });
  }

  gofurther(link) {
    this.router.navigate([link]);
  }
  async viewimg(src) {
    const images: any = new Array();
    await images.push({ src });
    this.global.lightBoxOpen(images, 0);
  }
  radioGroupChange(e) {
    this.soldval = e.detail.value;
    if (this.soldval === 'bulk') {
      this.getInitialDate().then((data) => {
        this.loadData2(data);
      });
    } else {
      this.getInitialDate().then((data) => {
        this.loadData(data);
      });
    }
  }
  getPaid(products) {
    let tmp: any = 0;
    for (const iterator of products) {
      tmp += this.global.round2Fixed(
        iterator.quantity * iterator.product.price.price
      );
    }
    return tmp;
  }
  dateChanged() {
    if (this.soldval === 'bulk') {
      this.page2 = 1;
      this.getInitialDate().then((data) => {
        if (data.start && data.end) {
          this.loadData2(data);
        }
      });
    } else {
      this.page = 1;
      this.getInitialDate().then((data) => {
        this.loadData(data);
      });
    }
  }
  refresh() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const day = today.getUTCDate();
    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 1)),
      end: new FormControl(new Date(year, month, day)),
    });
    this.page = 1;
    this.getInitialDate().then((data) => {
      this.loadData(data);
    });
  }
  ionViewWillEnter() {
    this.global.adminTeller = new Array();
    this.global.adminTeller.push('Sold');
  }
}
