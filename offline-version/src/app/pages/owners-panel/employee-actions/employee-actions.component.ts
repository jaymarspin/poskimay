import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { GlobalService } from '../../services/global.service';
import { HttpService } from '../../services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-actions',
  templateUrl: './employee-actions.component.html',
  styleUrls: ['./employee-actions.component.scss'],
})
export class EmployeeActionsComponent implements OnInit {
  @Input() id;
  @Input() disabled;
  constructor(
    public http: HttpService,
    public global: GlobalService,
    private popover: PopoverController,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.id);
  }

  gofurther(link) {
    this.popover.dismiss();
    this.router.navigate([link, this.id]);
  }
  disabler() {
    let disable = 'enable';
    if (this.disabled === 1) {
      disable = 'disable';
    }
    Swal.fire({
      title: 'Are you sure?',
      backdrop: false,
      text: `you can just ${disable} it back whenever you want`,
      icon: 'warning',

      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, please',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.disabled);
        this.http
          .postData('employee-disabler.php', {
            id: this.id,
            disabled: this.disabled,
          })
          .subscribe({
            next: (data) => {
              const response = JSON.parse(JSON.stringify(data));

              if (response.body.message === 'success') {
                Swal.fire({
                  icon: 'success',
                  title: 'success',
                  text: 'Updated successfully',
                }).then(() => {
                  this.popover.dismiss();
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: response.message,
                  footer: ' ',
                });
              }
            },
            error: (err) => {
              console.log(err);
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err,
                footer: ' ',
              });
            },
          });
      }
    });
  }

  delete() {
    Swal.fire({
      title: 'Are you sure?',
      backdrop: false,
      text: `once deleted you cannot undo it anymore`,
      icon: 'warning',

      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.postData(`delete-employee.php`, { id: this.id }).subscribe({
          next: (data) => {
            const response = JSON.parse(JSON.stringify(data));

            if (response.body.message === 'success') {
              Swal.fire({
                icon: 'success',
                title: 'success',
                text: 'Deleted successfully',
              }).then(() => {
                this.popover.dismiss();
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.message,
                footer: ' ',
              });
            }
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err,
              footer: ' ',
            });
          },
        });
      }
    });
  }
}
