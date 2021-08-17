import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import {SoldActionsComponent} from '../sold-actions/sold-actions.component';
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

  page: number;
  limit: number;
  pagebtntmp: any;
  pagebtn: any;

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

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: SoldActionsComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async getInitialDate(){
    return this.campaignOne.value;
  }
  ngOnInit() {
    this.getInitialDate().then(data =>{
      this.loadData(data);
    });
  }
  loadData(dates) {
    // ?limit="+this.limit+"&page="+pager+"&filter="+this.filter
    this.global.loading = true;
    this.http
      .getData(
        `get-sold.php?
          limit=${this.limit}
          &page=${this.page}
          &start=${dates.start},
          &end=${dates.end}`
      )
      .subscribe({
        next: (data) => {
          this.sold = new Array();

          const result = JSON.parse(JSON.stringify(data));
          console.log(result);
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
  pager(page) {
    this.page = page;
    this.getInitialDate().then(data =>{
      this.loadData(data);
    });
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
  radioGroupChange(e) {
    this.soldval = e.detail.value;
    console.log(this.soldval);
  }
  dateChanged() {
    console.log(this.campaignOne.value);
  }
}
