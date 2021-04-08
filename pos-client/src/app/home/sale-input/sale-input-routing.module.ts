import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleInputPage } from './sale-input.page';

const routes: Routes = [
  {
    path: '',
    component: SaleInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleInputPageRoutingModule {}
