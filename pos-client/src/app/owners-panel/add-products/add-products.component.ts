import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../services/global.service'
import {AddCategoryComponent} from '../add-category/add-category.component'
import {HttpService} from '../../services/http.service'
import { PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent implements OnInit {
  productname:any
  stocks:any
  barcode:any
  category


  categories

  
  constructor(public http: HttpService,private popoverController: PopoverController,public global: GlobalService) {
    
   }

  ngOnInit() {
      this.loadCategory()
  }

  loadCategory(){
    this.global.loading = true
    this.http.getData("get-category.php?id=1").subscribe({
      next: data => {
        console.log(data)
        this.categories = data
        this.global.loading = false
         
      },
      error: error => {
        this.global.loading = false
          console.error('There was an error!', error);
      }
    })
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
      component: AddCategoryComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

     await popover.onDidDismiss().then(
      (data: any) => {
       this.loadCategory()
      }) 
  }

  next(){
    if(this.productname && this.stocks && this.category){
      this.global.loading = true
      let data = {
        productname: this.productname,
        stocks: this.stocks,
        category: this.category,
        barcode: this.barcode,
        
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
