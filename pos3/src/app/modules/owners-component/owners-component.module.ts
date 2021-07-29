import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import {OwnerHeaderComponent} from '../../owners-panel/owner-header/owner-header.component'
import {EmployeesComponent} from '../../owners-panel/employees/employees.component';
import { FormsModule } from '@angular/forms';
import {AddEmployeeComponent} from '../../owners-panel/add-employee/add-employee.component'
import {DashboardComponent} from '../../owners-panel/dashboard/dashboard.component'
import {AttendanceComponent} from '../../owners-panel/attendance/attendance.component'
import {PayrollComponent} from '../../owners-panel/payroll/payroll.component'
import {AddDepartmentComponent} from '../../owners-panel/add-department/add-department.component'
import {ProductsComponent} from '../../owners-panel/products/products.component'
import {AddProductsComponent} from '../../owners-panel/add-products/add-products.component'
import {AddCategoryComponent} from '../../owners-panel/add-category/add-category.component'
import {ProductActionsComponent} from '../../owners-panel/product-actions/product-actions.component'
import {EmployeeActionsComponent} from '../../owners-panel/employee-actions/employee-actions.component'
import {EmployeeAccountsComponent} from '../../owners-panel/employee-accounts/employee-accounts.component'
import { LazyLoadImageModule} from 'ng-lazyload-image';
@NgModule({
  declarations: [OwnerHeaderComponent,EmployeesComponent,AddEmployeeComponent,DashboardComponent,AttendanceComponent,PayrollComponent,AddDepartmentComponent,ProductsComponent,
    AddProductsComponent,
    AddCategoryComponent,
    ProductActionsComponent,
    EmployeeAccountsComponent,
    EmployeeActionsComponent
    ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    LazyLoadImageModule,

  ],
  exports: [OwnerHeaderComponent,EmployeesComponent,AddEmployeeComponent,DashboardComponent,AttendanceComponent,PayrollComponent,AddDepartmentComponent,ProductsComponent,
    AddProductsComponent,
    AddCategoryComponent,
    ProductActionsComponent,
    EmployeeAccountsComponent,
    EmployeeActionsComponent
    ]
})
export class OwnersComponentModule { }
