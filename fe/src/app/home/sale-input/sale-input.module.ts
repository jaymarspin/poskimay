import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaleInputPageRoutingModule } from './sale-input-routing.module';

import { SaleInputPage } from './sale-input.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import {ProductsComponent} from './components/products/products.component'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    SaleInputPageRoutingModule,
    SuperTabsModule

  ],
  declarations: [SaleInputPage,
    ProductsComponent]
})
export class SaleInputPageModule {}
