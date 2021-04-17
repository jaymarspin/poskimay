import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnersPanelPage } from './owners-panel.page';

const routes: Routes = [
  {
    path: '',
    component: OwnersPanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnersPanelPageRoutingModule {}
