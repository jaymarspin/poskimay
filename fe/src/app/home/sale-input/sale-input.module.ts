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
import {DiscountsComponent} from './components/discounts/discounts.component';
import { SaleNoteComponent } from './sale-note/sale-note.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    SaleInputPageRoutingModule,
    SuperTabsModule,
    LazyLoadImageModule,

  ],
  declarations: [SaleInputPage,
    ProductsComponent,TodaysTransactionComponent,
    DiscountsComponent,SaleNoteComponent],
  exports:[ProductsComponent,TodaysTransactionComponent,DiscountsComponent
  ,SaleNoteComponent]
})
export class SaleInputPageModule {}
