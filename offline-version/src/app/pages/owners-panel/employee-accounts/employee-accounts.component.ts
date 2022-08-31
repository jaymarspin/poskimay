import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { HttpService } from '../../services/http.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employee-accounts',
  templateUrl: './employee-accounts.component.html',
  styleUrls: ['./employee-accounts.component.scss'],
})
export class EmployeeAccountsComponent implements OnInit {
  id: any;
  username: any;
  password: any;

  employee: any;
  public form = [
    { val: 'Cashier', isChecked: false },
    { val: 'Inventory', isChecked: false },
  ];
  constructor(
    private location: Location,
    private snapshopt: ActivatedRoute,
    public http: HttpService,
    public global: GlobalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.snapshopt.snapshot.paramMap.get('id');
    this.loadData().then(() => {});
  }
  async loadData() {
    await this.http.getData('get-employee-data.php?id=' + this.id).subscribe({
      next: (data) => {
        console.log(data);
        const result = JSON.parse(JSON.stringify(data));
        for (const [iterator, v] of this.form.entries()) {
          for (const [x, v2] of result.employeeRoles.entries()) {
            if (result.employeeRoles[x] === this.form[iterator].val) {
              this.form[iterator].isChecked = true;
            }
          }
        }
        this.global.loading = false;
        this.employee = data;
      },
    });
  }

  submit() {
    console.log(this.form);
    if (this.username && this.password) {
      this.global.loading = true;
      const data = {
        id: this.id,
        username: this.username,
        password: this.password,
        roles: this.form,
      };

      this.http.postData('add-employee-account.php', data).subscribe({
        next: (res) => {
          console.log(res);

          const result = JSON.parse(JSON.stringify(res));

          if (result.body.message === 'success') {
            Swal.fire('Good job!', 'Successfully added!', 'success').then(
              () => {
                this.location.back();
              }
            );
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error Occured, Please try again later',
              footer: ' ',
            });
          }
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
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please complete the fields',
        footer: ' ',
      });
    }
  }
  ionViewDidEnter() {
    if (this.global.adminTeller.length === 0) {
      this.global.adminTeller.push('Employee');
    }
    this.global.adminTeller.push('> Employee Accounts');
  }
  ionViewWillLeave() {
    this.global.adminTeller.pop();
  }
}
