import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-choose-employee',
  templateUrl: './choose-employee.component.html',
  styleUrls: ['./choose-employee.component.scss'],
})
export class ChooseEmployeeComponent implements OnInit {
  @Input() myimage;
  employees: any;
  id: any;
  constructor(public http: HttpService,public popoverController: PopoverController) { }

  ngOnInit() {
    this.http.getData(`get-employees-signin.php`).subscribe({
      next: data =>{
        console.log(data);
        this.employees = data;

      },error: err =>{
        console.log(err);
      }
    });
  }
  submit(inout){
    const data = {
      myimage: this.myimage,
      inout,
      id: this.id
    };
    console.log(data);
    this.http.postData(`add-attendance.php`,data).subscribe({
      next: response =>{
        console.log(response);
      },error: err =>{
        console.log(err);
      }
    });
    // this.popoverController.dismiss();
  }

}
