import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { HttpService } from '../../services/http.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AttendanceActionsComponent } from './attendance-actions/attendance-actions.component';
import Swal from 'sweetalert2';
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
  searchVal: any;
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
      start: new FormControl(new Date(year, month, 1)),
      end: new FormControl(new Date(year, month, day)),
    });
    this.searchVal = '';
  }

  async presentPopover(ev: any, id, rendered, notimeout, name) {
    console.log(notimeout);
    const popover = await this.popoverController.create({
      component: AttendanceActionsComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: {
        id,
        rendered,
        notimeout,
        name,
      },
    });
    await popover.present();
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.global.adminTeller = new Array();
    this.global.adminTeller.push('Attendance');
  }
  addemployee() {}

  async loadData(dates) {
    if (dates.start && dates.end) {
      this.global.loading = true;
      await this.http
        .getData(
          `get-employees-attendance.php?
          limit=${this.limit}
          &page=${this.page}
          &start=${this.global.formattedDate(dates.start)}
          &end=${this.global.formattedDate(dates.end)}
          &search=${this.searchVal}          `
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
  }

  pager(page) {
    this.page = page;
    this.getInitialDate().then((data) => {
      this.loadData(data);
    });
  }

  calculateRendered(rendered) {
    let tmp = 0;
    for (const iterator of rendered) {
      tmp += parseInt(iterator.torender, 10);
    }
    return tmp;
  }

  gofurther(link) {
    this.router.navigate([link]);
  }
  ionViewDidEnter() {
    this.getInitialDate().then((data) => {
      this.loadData(data);
    });
  }

  dateChanged() {
    this.getInitialDate().then((data) => {
      this.loadData(data);
    });
  }
  async getInitialDate() {
    return this.campaignOne.value;
  }

  search(){
    this.page = 1;
    this.getInitialDate().then((data) => {
      this.loadData(data);
    });
  }
  refresh(){
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const day = today.getUTCDate();
    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 1)),
      end: new FormControl(new Date(year, month, day)),
    });
    this.page = 1;
    this.searchVal = '';
    this.getInitialDate().then((data) => {
      this.loadData(data);
    });
  }
}
