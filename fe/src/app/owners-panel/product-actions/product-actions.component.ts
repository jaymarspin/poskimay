import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { LoadingController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.scss'],
})
export class ProductActionsComponent implements OnInit {
  @Input() id: any;
  @Input() availability: any;
  availabilityText: string;
  constructor(
    public loadingController: LoadingController,
    public http: HttpService,
    private popoverController: PopoverController,
    public global: GlobalService,
    public router: Router
  ) {}

  ngOnInit() {
    if (this.availability === 1) {
      this.availability = 0;
      this.availabilityText = 'You can just mark it available again sometimes';
    } else {
      this.availability = 1;
      this.availabilityText = 'You are going to mark it available';
    }
  }
  availabilityUpdate() {
    Swal.fire({
      title: 'Are you sure?',
      backdrop: false,
      text: this.availabilityText,
      icon: 'warning',

      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, mark it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.global.loading = true;
        const data = {
          id: this.id,
          availability: this.availability,
        };
        this.http.postData('availability.php', data).subscribe({
          next: (res) => {
            this.global.loading = false;
            const response = JSON.parse(JSON.stringify(res));
            console.log(res);
            if (response.body.message === 'success') {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'product has been marked',
              }).then(() => {
                this.popoverController.dismiss();
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error has occured!',
              });
            }
          },
          error: (err) => {
            console.log(err);
            this.global.loading = false;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err,
            });
          },
        });
      }
    });
  }
  edit() {
    this.popoverController.dismiss();
    this.router.navigate(['owners-panel/add-products/' + this.id]);
  }
  delete() {
    Swal.fire({
      title: 'Are you sure?',
      backdrop: false,
      text: 'Once deleted you cannot undo it',
      icon: 'warning',

      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          id: this.id,
        };
        this.global.loading = true;
        this.http.postData(`delete-product.php`, data).subscribe({
          next: (res) => {
            this.global.loading = false;
            const response = JSON.parse(JSON.stringify(res));
            if (response.body.message === 'success') {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'product has been removed',
              }).then(() => {
                this.popoverController.dismiss();
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error has occured!',
              });
            }
          },
          error: (err) => {
            this.global.loading = false;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err,
            });
          },
        });
      }
    });
  }
}
