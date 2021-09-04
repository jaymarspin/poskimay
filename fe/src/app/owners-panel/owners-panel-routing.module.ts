import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnersPanelPage } from './owners-panel.page';
import {EmployeesComponent} from './employees/employees.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AttendanceComponent} from './attendance/attendance.component';
import {PayrollComponent} from './payroll/payroll.component';
import {ProductsComponent} from './products/products.component';
import {AddProductsComponent} from './add-products/add-products.component';
import {EmployeeAccountsComponent} from './employee-accounts/employee-accounts.component';
import {SoldComponent} from './sold/sold.component';
import {SettingsComponent} from './settings/settings.component';
const routes: Routes = [
  {
    path: '',
    component: OwnersPanelPage,
    children:[
      {
        path: '',
        redirectTo: 'employee',
        pathMatch: 'full'

      },
      {
        path: 'employee',
        component: EmployeesComponent

      },
      {
        path: 'add-employee',
        component: AddEmployeeComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent

      },
      {
        path: 'attendance',
        component: AttendanceComponent

      },
      {
        path: 'payroll',
        component: PayrollComponent

      },{
        path: 'products',
        component: ProductsComponent
      },{
        path: 'add-products',
        component: AddProductsComponent
      },{
        path: 'add-products/:id',
        component: AddProductsComponent
      }
      ,{
        path: 'employee-accounts/:id',
        component: EmployeeAccountsComponent
      },{
        path: 'sold',
        component: SoldComponent
      },{
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnersPanelPageRoutingModule {}
