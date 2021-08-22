import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import {ProductsSoldComponent} from '../sold/products-sold/products-sold.component';
@Component({
  selector: 'app-sold-actions',
  templateUrl: './sold-actions.component.html',
  styleUrls: ['./sold-actions.component.scss'],
})
export class SoldActionsComponent implements OnInit {
  @Input() id: any;
  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }

  viewProducts(){
    this.popoverController.dismiss().then(() =>{
      this.presentPopover().then(() =>{
      });
    });
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: ProductsSoldComponent,
      componentProps: {id: this.id},
      translucent: true,
      cssClass: 'attendance-popover'
    });
    await popover.present();
  }

}
