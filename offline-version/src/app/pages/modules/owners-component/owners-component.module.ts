import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { OwnerHeaderComponent } from "../../owners-panel/owner-header/owner-header.component";
import { EmployeesComponent } from "../../owners-panel/employees/employees.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddEmployeeComponent } from "../../owners-panel/add-employee/add-employee.component";
import { DashboardComponent } from "../../owners-panel/dashboard/dashboard.component";
import { AttendanceComponent } from "../../owners-panel/attendance/attendance.component";
import { PayrollComponent } from "../../owners-panel/payroll/payroll.component";
import { AddDepartmentComponent } from "../../owners-panel/add-department/add-department.component";
import { ProductsComponent } from "../../owners-panel/products/products.component";
import { AddProductsComponent } from "../../owners-panel/add-products/add-products.component";
import { AddCategoryComponent } from "../../owners-panel/add-category/add-category.component";
import { ProductActionsComponent } from "../../owners-panel/product-actions/product-actions.component";
import { EmployeeActionsComponent } from "../../owners-panel/employee-actions/employee-actions.component";
import { EmployeeAccountsComponent } from "../../owners-panel/employee-accounts/employee-accounts.component";
import { SoldComponent } from "../../owners-panel/sold/sold.component";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { SoldActionsComponent } from "src/app/pages//owners-panel/sold-actions/sold-actions.component";
import { ProductsSoldComponent } from "../../owners-panel/sold/products-sold/products-sold.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { AttendanceActionsComponent } from "src/app/pages/owners-panel/attendance/attendance-actions/attendance-actions.component";
import { CalendarComponent } from "src/app/pages/owners-panel/attendance/calendar/calendar.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { TimeLogViewComponent } from "../../owners-panel/attendance/time-log-view/time-log-view.component";
import { SettingsComponent } from "../../owners-panel/settings/settings.component";
import { ReportFrameComponent } from "../../owners-panel/report-frame/report-frame.component";
import { ViewCasherComponent } from "../../owners-panel/sold/view-casher/view-casher.component";
import { NgxPaginationModule } from "ngx-pagination";
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin,
]);
@NgModule({
  declarations: [
    OwnerHeaderComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    DashboardComponent,
    AttendanceComponent,
    PayrollComponent,
    AddDepartmentComponent,
    ProductsComponent,
    AddProductsComponent,
    AddCategoryComponent,
    ProductActionsComponent,
    EmployeeAccountsComponent,
    EmployeeActionsComponent,
    SoldComponent,
    SoldActionsComponent,
    ProductsSoldComponent,
    AttendanceActionsComponent,
    CalendarComponent,
    TimeLogViewComponent,
    SettingsComponent,
    ReportFrameComponent,
    ViewCasherComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    LazyLoadImageModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgxPaginationModule,
  ],
  exports: [
    OwnerHeaderComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    DashboardComponent,
    AttendanceComponent,
    PayrollComponent,
    AddDepartmentComponent,
    ProductsComponent,
    AddProductsComponent,
    AddCategoryComponent,
    ProductActionsComponent,
    EmployeeAccountsComponent,
    EmployeeActionsComponent,
    SoldComponent,
    SoldActionsComponent,
    ProductsSoldComponent,
    AttendanceActionsComponent,
    CalendarComponent,
    TimeLogViewComponent,
    SettingsComponent,
    ReportFrameComponent,
    ViewCasherComponent,
  ],
})
export class OwnersComponentModule {}
