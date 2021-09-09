import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-report-frame',
  templateUrl: './report-frame.component.html',
  styleUrls: ['./report-frame.component.scss'],
})
export class ReportFrameComponent implements OnInit {
  campaignOne: any;
  type: any;
  employee: any;
  employees: any;
  constructor(
    public http: HttpService,
    public global: GlobalService,
    public router: Router,
    private popOverCtroller: PopoverController
  ) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const day = today.getUTCDate();
    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, day)),
      end: new FormControl(new Date(year, month, day)),
    });
  }

  ngOnInit() {
    this.http.getData(`get-employees-report.php`).subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async getInitialDate() {
    return this.campaignOne.value;
  }
  submit() {
    this.getInitialDate().then(async (data) => {
      if (data.start && data.end) {
        if (this.type === 'attendance') {
          if (this.employee) {
            this.global.reportData = {
              type: this.type,
            };
            await this.router.navigate(['reports']);
            this.popOverCtroller.dismiss();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Please select an employee',
            });
          }
        } else {
          this.global.reportData = {
            type: this.type,
          };
          await this.router.navigate(['reports']);
          this.popOverCtroller.dismiss();
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    });
  }
}
