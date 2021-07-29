import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EmployeeActionsComponent } from '../employee-actions/employee-actions.component';
import { GlobalService } from '../../services/global.service';
import { HttpService } from '../../services/http.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employee: any;
  employeescount: any;

  page: number;
  limit: number;
  pagebtntmp: any;
  pagebtn: any;
  constructor(
    public global: GlobalService,
    public http: HttpService,
    private router: Router,
    public popoverController: PopoverController
  ) {
    this.employee = new Array();
    this.pagebtn = new Array();

    this.page = 1;
    this.limit = 10;
  }

  async presentPopover(ev: any, id) {
    const popover = await this.popoverController.create({
      component: EmployeeActionsComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: {
        id,
      },
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  ngOnInit() {
    this.loadData();
  }

  addemployee() {}

  loadData() {
    // ?limit="+this.limit+"&page="+pager+"&filter="+this.filter
    this.global.loading = true;
    this.http
      .getData(
        `get-employees.php?
          limit=${this.limit}
          &page=${this.page}`
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.employee = new Array();

          const result = JSON.parse(JSON.stringify(data));
          this.employeescount = result.employees_count;
          const length = result.employees.length;

          this.pagebtntmp = this.employeescount / this.limit;
          this.pagebtn = Array();
          for (let ii = 1; ii < this.pagebtntmp + 1; ii++) {
            this.pagebtn.push(ii);
          }
          for (let iii = 0; iii < length; iii++) {
            this.employee.push(result.employees[iii]);
          }
          this.global.loading = false;
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
            footer: ' ',
          });
        },
      });
  }

  pager(page) {
    this.page = page;
    this.loadData();
  }

  gofurther(link) {
    this.router.navigate([link]);
  }
}