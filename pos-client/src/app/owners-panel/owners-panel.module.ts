import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnersPanelPageRoutingModule } from './owners-panel-routing.module';

import { OwnersPanelPage } from './owners-panel.page'; 
import {OwnerHeaderComponent} from './owner-header/owner-header.component'
import {EmployeesComponent} from './employees/employees.component'
import { SidebarModule } from 'ng-sidebar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnersPanelPageRoutingModule,
    SidebarModule.forRoot()
  ],
  declarations: [OwnersPanelPage,OwnerHeaderComponent,EmployeesComponent]
})
export class OwnersPanelPageModule {}
