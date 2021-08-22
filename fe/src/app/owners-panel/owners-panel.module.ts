import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnersPanelPageRoutingModule } from './owners-panel-routing.module';

import { OwnersPanelPage } from './owners-panel.page';

import {SidebarModule} from 'ng-sidebar';
import { LightboxModule } from 'ngx-lightbox';
import {OwnersComponentModule} from '../modules/owners-component/owners-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnersPanelPageRoutingModule,
    OwnersComponentModule,
    LightboxModule,
    SidebarModule.forRoot(),

  ],
  declarations: [OwnersPanelPage

  ],


})
export class OwnersPanelPageModule {}
