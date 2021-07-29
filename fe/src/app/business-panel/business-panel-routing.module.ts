import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessPanelPage } from './business-panel.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessPanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessPanelPageRoutingModule {}
