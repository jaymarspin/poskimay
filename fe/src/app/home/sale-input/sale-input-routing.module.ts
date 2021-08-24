import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleInputPage } from './sale-input.page';
import {ProductsComponent} from './components/products/products.component';
import {TodaysTransactionComponent} from './components/todays-transaction/todays-transaction.component';
import {DiscountsComponent} from './components/discounts/discounts.component';
const routes: Routes = [
  {
    path: '',
    component: SaleInputPage,
    children: [
      {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full'
      },
      {
        path: 'product',
        component: ProductsComponent
      },
      {
        path: 'discounts',
        component: DiscountsComponent
      },
      {
        path: 'transactions',
        component: TodaysTransactionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleInputPageRoutingModule {}
