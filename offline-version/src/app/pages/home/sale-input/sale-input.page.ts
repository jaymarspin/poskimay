import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { HttpService } from '../../services/http.service';
import * as _ from 'lodash';
import { ChangeDetectorRef } from '@angular/core';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { GlobalService } from '../../services/global.service';
import { PopoverController } from '@ionic/angular';
import { SaleNoteComponent } from './sale-note/sale-note.component';
import {wholesoldRepository} from 'src/app/repositories/whole_sold/whole_sold.repository'
import { wholesold } from 'src/app/models/sold';
import { soldRepository } from 'src/app/repositories/sold/sold.repository';
@Component({
  selector: 'app-sale-input',
  templateUrl: './sale-input.page.html',
  styleUrls: ['./sale-input.page.scss'],
})
export class SaleInputPage implements OnInit {
  barcode: any;
  total: any;
  buyaction: any;
  customercash: any;
  notes: any;
  constructor(
    public global: GlobalService,
    private popoverController: PopoverController,
    public http: HttpService,
    private ref: ChangeDetectorRef,
    private wholesold: wholesoldRepository,
    private sold: soldRepository
  ) {
    this.total = 0;
    this.buyaction = false;
    this.notes = '';
  }
  codeinputchange() {
    this.codeaction().then(() => {});
  }
  async codeaction() {
    await this.http
      .getData(`get-productbycode.php?code=${this.barcode}`)
      .subscribe({
        next: (data) => {
          const result = JSON.parse(JSON.stringify(data));
          const duplicateCheck = new Array();
          _.forEach(this.global.sales, (value) => {
            console.log('from saleinput');
            console.log(value);
            if (result.id === value.data.id) {
              duplicateCheck.push(true);
            } else {
              duplicateCheck.push(false);
            }
          });
          if (!duplicateCheck.includes(true)) {
            if (data && !Array.isArray(data)) {
              this.global.sales.push({
                data,
              });
            } else {
              Swal.fire({
                backdrop: false,
                icon: 'error',
                title: 'Oops...',
                text: 'Code not found',
                footer: '',
              });
            }
          } else {
            Swal.fire({
              backdrop: false,
              icon: 'error',
              title: 'Oops...',
              text: 'Product already added',
              footer: '',
            });
          }
          delete this.barcode;
        },
        error: (err) => {
          delete this.barcode;
        },
      });
  }
  async presentPopover(ev: any, item) {
    const popover = await this.popoverController.create({
      component: ProductViewComponent,
      cssClass: 'productviewfrominput',
      componentProps: { item },
      event: ev,
      translucent: true,
    });
    await popover.present();

    await popover.onDidDismiss();
  }

  async addNote(ev: any) {
    if (this.global.sales.length > 0) {
      const popover = await this.popoverController.create({
        component: SaleNoteComponent,
        cssClass: 'productviewfrominput',
        componentProps: {
          notes: this.notes,
        },
        translucent: true,
      });
      await popover.present();
      await popover.onDidDismiss().then((data) => {
        this.notes = data.data.note;
      });
    }
  }
  ngOnInit() {}
  delete(i) {
    Swal.fire({
      title: 'Are you sure?',
      backdrop: false,
      text: 'You can just add it back',
      icon: 'warning',

      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.global.sales.splice(i, 1);
        // this.totalcalculation();
      }
    });
  }
  totalcalculator() {
    let tmp = 0;
    _.forEach(this.global.sales, (value) => {
      tmp += value.data.price.price * value.data.quantity;
    });
    return this.global.round2Fixed(tmp);
  }
  buynow() {
    if (this.buyaction === false) {
      if (this.customercash >= this.totalcalculator()) {
        this.buyaction = true;
        const data: wholesold = {
          sold: this.global.sales,
          cash: this.customercash, 
          extras: {
            notes: this.notes
          },
        };
        console.log(data);
        this.wholesold.create(data).then(res =>{
          _.forEach(this.global.sales,value => {
            console.log(value)
          });
        })
        // this.http.postData(`add-sold.php`, data).subscribe({
        //   next: (res) => {
        //     console.log(res);
        //     if (res.body.message === 'success') {
        //       Swal.fire({
        //         title: 'Good Job',
        //         icon: 'success',
        //         text: 'Transaction Recorded!',
        //         backdrop: false,
        //       });
        //     }
        //     this.global.sales = new Array();
        //     delete this.customercash;
        //     this.notes = '';
        //     this.buypause();
        //   },
        //   error: (err) => {
        //     console.log(err);
        //     this.buypause();
        //   },
        // });
      } else {
        Swal.fire({
          backdrop: false,
          icon: 'error',
          title: 'Oops...',
          text: 'Not enough money',
          footer: '',
        });
      }
    }
  }
  buypause() {
    setTimeout(() => {
      this.buyaction = false;
    }, 1500);
  }

  checkInput(value) {
    let tmp = value;
    if (parseFloat(value) <= 0) {
      tmp = 1;
    }
    return tmp;
  }
  inputChange(value) {
    let tmp = value;
    if (!value) {
      tmp = 1;
    }
    return tmp;
  }

  clearNote() {
    this.notes = '';
  }

  cancel() {
    this.global.sales = new Array();
    this.notes = '';
    this.customercash = '';
  }
  quantityCalc(value, quantity) {
    return this.global.round2Fixed(value * quantity);
  }
  changeCalc(value) {
    return value - this.totalcalculator();
  }
}
