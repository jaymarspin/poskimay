import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SoldActionsComponent } from 'src/app/pages/owners-panel/sold-actions/sold-actions.component';
import { GlobalService } from '../../../../services/global.service';
import { HttpService } from '../../../../services/http.service';
 
import { FormGroup, FormControl } from '@angular/forms';
import { wholesoldRepository } from 'src/app/repositories/whole_sold/whole_sold.repository';
import { Product } from 'src/app/models/Product';
import { sort } from 'fast-sort';
import { wholesold } from 'src/app/models/sold';
@Component({
  selector: 'app-todays-transaction',
  templateUrl: './todays-transaction.component.html',
  styleUrls: ['./todays-transaction.component.scss'],
})
export class TodaysTransactionComponent implements OnInit {
  page: number;
  limit: number;
  pagebtntmp: any;
  pagebtn: any;
  sold = new Array<wholesold>();
  soldcount: any;
  campaignOne: FormGroup;
  constructor(
    public global: GlobalService,
    public http: HttpService,
    private router: Router,
    public popoverController: PopoverController,
    private wholesold: wholesoldRepository
  ) {
    this.sold = new Array<wholesold>();
    this.pagebtn = new Array();

    this.page = 1;
    this.limit = 10;
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const day = today.getUTCDate();
    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, day)),
      end: new FormControl(new Date(year, month, day)),
    });
  }

  ngOnInit() {}

  async loadData() {

     const tmp = await this.wholesold.getWithRelations(((20 * (this.page - 1))) - 1).then(res => res)
     console.log(this.sold)


     const sorted = sort(tmp).desc([
      u => u.id, 
    ]);
    this.sold = sorted
     
    // this.global.loading = true;
    // await this.http
    //   .getData(
    //     `get-bulk-sold.php?
    //   limit=${this.limit}
    //   &page=${this.page}
    //   &start=${this.global.formattedDate(dates.start)},
    //       &end=${this.global.formattedDate(dates.end)}`
    //   )
    //   .subscribe({
    //     next: (data) => {
    //       this.sold = new Array();

    //       const result = JSON.parse(JSON.stringify(data));
    //       console.log(result);
    //       this.soldcount = result.sold_count;
    //       const length = result.sold.length;

    //       this.pagebtntmp = this.soldcount / this.limit;
    //       this.pagebtn = Array();
    //       for (let ii = 1; ii < this.pagebtntmp + 1; ii++) {
    //         this.pagebtn.push(ii);
    //       }
    //       for (let i = 0; i < length; i++) {
    //         this.sold.push(result.sold[i]);
    //         console.log(this.sold);
    //       }

    //       this.global.loading = false;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //   });
  }
  async getInitialDate() {
    return this.campaignOne.value;
  }
  pager(page) {
    this.page = page;
    this.getInitialDate().then((data) => {
      this.loadData();
    });
  }
  getPaid(products: Product[]) {
    // console.log(products)
    let tmp: any = 0;
    for (const iterator of products) {
      tmp += this.global.round2Fixed(
        iterator.quantity * iterator.price.price
      );
    }
    return tmp;
  }

  async presentPopover(ev: any, id) {
    const popover = await this.popoverController.create({
      component: SoldActionsComponent,
      cssClass: 'my-custom-class',
      componentProps: { id },
      event: ev,
      translucent: true,
    });
    await popover.present();
  }
  refresh() {
    this.page = 1;
    this.getInitialDate().then((data) => {
      this.loadData();
    });
  }

  ionViewDidEnter() {
    this.getInitialDate().then((data) => {
      this.loadData();
    });
  }

  pageChange(e: any){
  
    this.page = e
      
    
     this.loadData()
  }
}
