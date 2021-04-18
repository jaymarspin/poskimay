import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnersPanelPage } from './owners-panel.page';
import {EmployeesComponent} from './employees/employees.component'
import {AddEmployeeComponent} from './add-employee/add-employee.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {AttendanceComponent} from './attendance/attendance.component'
import {PayrollComponent} from './payroll/payroll.component'
const routes: Routes = [
  {
    path: '',
    component: OwnersPanelPage,
    children:[
      {
        path: "",
        redirectTo: "employee",
        pathMatch: "full"

      },
      {
        path: "employee",
        component: EmployeesComponent

      },
      {
        path: "add-employee",
        component: AddEmployeeComponent
      },
      {
        path: "dashboard",
        component: DashboardComponent

      },
      {
        path: "attendance",
        component: AttendanceComponent

      },
      {
        path: "payroll",
        component: PayrollComponent

      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnersPanelPageRoutingModule {}
