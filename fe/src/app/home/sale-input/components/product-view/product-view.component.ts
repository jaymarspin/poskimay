import { Component, OnInit,Input } from '@angular/core';
import {GlobalService} from '../../../../services/global.service';
import {HttpService} from '../../../../services/http.service';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  @Input() item;


  constructor(public global: GlobalService,public http: HttpService,public popoverController: PopoverController) {

   }

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
  viewimg(src){
    const img = Array({
      src
    });
    this.global.lightBoxOpen(img,0);
  }

}
