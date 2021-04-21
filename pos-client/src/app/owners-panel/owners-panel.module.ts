import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnersPanelPageRoutingModule } from './owners-panel-routing.module';

import { OwnersPanelPage } from './owners-panel.page'; 
import {OwnerHeaderComponent} from './owner-header/owner-header.component'
import {EmployeesComponent} from './employees/employees.component'
import { SidebarModule } from 'ng-sidebar';

import {AddEmployeeComponent} from './add-employee/add-employee.component'
import {DashboardComponent} from './dashboard/dashboard.component' 
import {AttendanceComponent} from './attendance/attendance.component'
import {PayrollComponent} from './payroll/payroll.component'
import {AddDepartmentComponent} from './add-department/add-department.component'
import {ProductsComponent} from './products/products.component'
import {AddProductsComponent} from './add-products/add-products.component'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnersPanelPageRoutingModule,
    SidebarModule.forRoot(), 
  ],
  declarations: [OwnersPanelPage,OwnerHeaderComponent,EmployeesComponent,AddEmployeeComponent,DashboardComponent,AttendanceComponent,PayrollComponent,AddDepartmentComponent,ProductsComponent,
    AddProductsComponent
  
  ]
})
export class OwnersPanelPageModule {}
