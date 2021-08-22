import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { HttpService } from '../../services/http.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl } from '@angular/forms';
import { AttendanceActionsComponent } from './attendance-actions/attendance-actions.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  employee: any;
  employeescount: any;

  page: number;
  limit: number;
  pagebtntmp: any;
  pagebtn: any;

  campaignOne: FormGroup;
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

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const day = today.getUTCDate();
    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, day)),
      end: new FormControl(new Date(year, month, day)),
    });
  }

  async presentPopover(ev: any, id) {
    const popover = await this.popoverController.create({
      component: AttendanceActionsComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: {
        id,
      },
    });
    await popover.present();
  }

  ngOnInit() {
    this.loadData();
  }

  addemployee() {}

  async loadData() {
    // ?limit="+this.limit+"&page="+pager+"&filter="+this.filter
    this.global.loading = true;
   await this.http
      .getData(
        `get-employees-attendance.php?
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
          console.log(error);
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
  ionViewDidEnter(){
    this.loadData().then(() =>{

    });
  }

  dateChanged() {
  }
}
