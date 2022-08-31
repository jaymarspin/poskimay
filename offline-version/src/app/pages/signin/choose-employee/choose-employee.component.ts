import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/pages/services/http.service';
import { PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-choose-employee',
  templateUrl: './choose-employee.component.html',
  styleUrls: ['./choose-employee.component.scss'],
})
export class ChooseEmployeeComponent implements OnInit {
  @Input() myimage;
  employees: any;
  id: any;
  goTimeOut: any = null;
  constructor(
    public http: HttpService,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.http.getData(`get-employees-signin.php`).subscribe({
      next: (data) => {
        console.log(data);
        this.employees = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  submit(inout) {
    if (this.id) {
      const data = {
        myimage: this.myimage,
        inout,
        id: this.id,
        goTimeOut: this.goTimeOut,
      };
      console.log(data);
      this.http.postData(`add-attendance.php`, data).subscribe({
        next: (response) => {
          console.log(response);
          if (response.body.message === 'success') {
            Swal.fire('Good job!', 'Time logged Successfully', 'success').then(
              () => {
                delete this.goTimeOut;
                this.popoverController.dismiss();
              }
            );
          } else if (response.body.message === 'suggesttimein') {
            Swal.fire({
              title: `You have not timed out for ${response.body.hours} hours`,
              text: `if this is charged as over time press "proceed to time out" otherwise press the "cancel" button`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'proceed to timed out',
            }).then((result) => {
              if (result.isConfirmed) {
                this.goTimeOut = 1;
                this.submit('time out');
              }
            });
          } else if (response.body.message === 'shouldTimeIn') {
            Swal.fire('The Internet?', 'You have not time in yet', 'question');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              backdrop: false,
              text: response.body.message,
            });
          }
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            backdrop: false,
            text: err,
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        backdrop: false,
        text: 'Please select you name first',
      });
    }
  }
}
