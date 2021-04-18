import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import {Router } from '@angular/router'
import {EmployeeActionsComponent} from '../employee-actions/employee-actions.component'
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employee:any
  constructor(private router: Router ,public popoverController: PopoverController) {
    this.employee = new Array()
    this.employee.push({
      sample: ""
    })
    this.employee.push({
      sample: ""
    })
    this.employee.push({
      sample: ""
    })
    this.employee.push({
      sample: ""
    })
    this.employee.push({
      sample: ""
    })
    this.employee.push({
      sample: ""
    })
   }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: EmployeeActionsComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  ngOnInit() {}

  addemployee(){
      
  }

  gofurther(link){
    this.router.navigate([link])
  }

}
