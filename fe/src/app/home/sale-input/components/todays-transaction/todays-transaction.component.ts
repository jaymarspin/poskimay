import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SoldActionsComponent } from 'src/app/owners-panel/sold-actions/sold-actions.component';
import { GlobalService } from '../../../../services/global.service';
import { HttpService } from '../../../../services/http.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl } from '@angular/forms';
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
  sold: any;
  soldcount: any;
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

  ngOnInit() {
    this.loadData();
  }

  async loadData(){
    this.global.loading = true;
   await this.http.getData(
      `get-bulk-sold.php?
      limit=${this.limit}
      &page=${this.page}
      &start=adwad,
      &end=awdad`
    ).subscribe({
      next: data =>{
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
      },error: err =>{
        console.log(err);
      }
    });

  }
  pager(page) {
    this.page = page;
    this.loadData();
  }
  getPaid(products){
    let tmp: any = 0;
    for (const iterator of products) {
      tmp += this.global.round2Fixed(iterator.quantity * iterator.product.price.price);
    }
    return tmp;
  }

  async presentPopover(ev: any,id) {
    const popover = await this.popoverController.create({
      component: SoldActionsComponent,
      cssClass: 'my-custom-class',
      componentProps: {id},
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


}
