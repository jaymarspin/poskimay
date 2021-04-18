import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnersPanelPage } from './owners-panel.page';
import {EmployeesComponent} from './employees/employees.component'
const routes: Routes = [
  {
    path: '',
    component: OwnersPanelPage,
    children:[
      {
        path: "employee",
        component: EmployeesComponent

      }
    ]
  },
  {
    path: 'add-employee',
    loadChildren: () => import('./add-employee/add-employee.module').then( m => m.AddEmployeePageModule),
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnersPanelPageRoutingModule {}
