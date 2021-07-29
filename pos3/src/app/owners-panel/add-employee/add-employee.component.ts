import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../services/global.service'
import {AddDepartmentComponent} from '../add-department/add-department.component'
import {HttpService} from '../../services/http.service'
import { PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  fname:any
  lname:any
  address:any
  contact:any
  gender:any
  constructor(public http: HttpService,private popoverController: PopoverController,public global: GlobalService) {
    
   }

  ngOnInit() {
      // this.loadDepartment()
  }

  // loadDepartment(){
  //   this.global.loading = true
  //   this.http.getData("get-department.php?id=1").subscribe({
  //     next: data => {
  //       console.log(data)
  //       this.department = data
  //       this.global.loading = false
         
  //     },
  //     error: error => {
  //       this.global.loading = false
  //         console.error('There was an error!', error);
  //     }
  //   })
  // }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: AddDepartmentComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

     await popover.onDidDismiss().then(
      (data: any) => {
      //  this.loadDepartment()
      }) 
  }

  next(){
    if(this.fname && this.lname && this.address && this.contact && this.contact){
      this.global.loading = true
      let data = {
        fname: this.fname,
        lname: this.lname,
        address: this.lname,
        contact: this.contact,
        gender: this.gender,
        shop_id: 1
      }
      console.log(data)
      this.http.postData("add-employee.php",data).subscribe({
        next: data =>{

          if(data.body.message =="success"){
            Swal.fire(
              'Good job!',
              'You clicked the button!',
              'success'
            ).then(() =>{
               
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href>Why do I have this issue?</a>'
            })
          }
  
        },onerror: error =>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            footer: ' '
          })
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please complete the fields',
        footer: ' '
      })
    }
    
  }

}
