import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import {Router } from '@angular/router'
import {EmployeeActionsComponent} from '../employee-actions/employee-actions.component'
import {GlobalService} from '../../services/global.service' 
import {HttpService} from '../../services/http.service'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  employee:any
  products:any
  constructor(public global: GlobalService,public http: HttpService,private router: Router ,public popoverController: PopoverController) {
    this.products = new Array()
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

  ngOnInit() {
    this.loadData()
  }
  loadData(){
    this.http.getData("get-products.php?id="+localStorage.getItem("business_id")).subscribe({
      next: data =>{
         let length = data.length
   
            for(var i =0;i < length;i++){
          this.products.push(data[i])
          console.log(this.products)
      }
    }
    })
    
    // this.http.getData("get-products.php?id="+localStorage.getItem("business_id")).subscribe({
    //   next: data =>{
    //     console.log(data)
    //     for(var i =0;i < data.body;i++){
    //       this.products.push(data.body[i])
    //       console.log(this.products)
    //     }

    //   },onerror: error =>{
    //     console.log(error)
    //   }
    // })
  }
  addemployee(){
      
  }

  gofurther(link){
    this.router.navigate([link])
  }


}
