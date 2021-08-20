import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaleInputPageRoutingModule } from './sale-input-routing.module';

import { SaleInputPage } from './sale-input.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import {ProductsComponent} from './components/products/products.component';
import { LazyLoadImageModule} from 'ng-lazyload-image';
import { TodaysTransactionComponent } from './components/todays-transaction/todays-transaction.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    SaleInputPageRoutingModule,
    SuperTabsModule,
    LazyLoadImageModule

  ],
  declarations: [SaleInputPage,
    ProductsComponent,TodaysTransactionComponent],
  exports:[ProductsComponent,TodaysTransactionComponent]
})
export class SaleInputPageModule {}
