import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessPanelPageRoutingModule } from './business-panel-routing.module';

import { BusinessPanelPage } from './business-panel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessPanelPageRoutingModule,
  ],
  declarations: [BusinessPanelPage],
})
export class BusinessPanelPageModule {}
