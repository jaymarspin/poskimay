import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { HttpService } from '../../../../services/http.service';
import { PopoverController } from '@ionic/angular';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  @Input() item;

  constructor(
    public global: GlobalService,
    public http: HttpService,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    console.log(this.item);
    // this.http.getData(`get-product.php?id=${this.id}`).subscribe({
    //   next: data =>{
    //     console.log(data);
    //   },
    //   error: err =>{
    //     console.log(err);
    //   }
    // });
  }
  viewimg(src) {
    const img = Array({
      src,
    });
    this.global.lightBoxOpen(img, 0);
  }
  async addProduct() {
    const duplicateCheck = new Array();
    _.forEach(this.global.sales, (value) => {
      console.log(value);
      if (this.item.id === value.data.id) {
        duplicateCheck.push(true);
      } else {
        duplicateCheck.push(false);
      }
    });
    if (!duplicateCheck.includes(true)) {
      this.item.quantity = 1
      await this.global.sales.push({
        data: this.item,
      });
    } else {
      Swal.fire({
        backdrop: false,
        icon: 'error',
        title: 'Oops...',
        text: 'Product already added',
        footer: '',
      });
    }
    this.popoverController.dismiss();
  }
}
