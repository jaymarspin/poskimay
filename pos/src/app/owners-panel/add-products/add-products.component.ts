import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../services/global.service'
import {AddCategoryComponent} from '../add-category/add-category.component'
import {HttpService} from '../../services/http.service'
import { PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2'
import { Router } from '@angular/router'
import {Location} from '@angular/common';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent implements OnInit {
  productname:any
  stocks:any
  barcode:any
  category:any
  price:any


  categories


  imgsrc:any
  base64data:any


  constructor(private location: Location,public http: HttpService,private popoverController: PopoverController,public global: GlobalService,


    private router: Router,

    ) {
      this.imgsrc = "assets/icon/photo.svg"
    this.barcode = ""
   }

  ngOnInit() {
      this.loadCategory()
  }
  inputchange(event){


    this.global.processimg(event).then(data =>{
      this.base64data = data

    })
  }
  loadCategory(){
    this.global.loading = true
    this.http.getData("get-product-category.php?id="+localStorage.getItem("business_id")).subscribe({
      next: data => {

        this.categories = data
        this.global.loading = false

      },
      error: error => {
        this.global.loading = false
          console.error('There was an error!', error);
      }
    })
  }


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




  async next(){
    if(this.productname && this.stocks && this.category && this.price){
      this.global.loading = true
      let data = {
        productname: this.productname,
        stocks: this.stocks,
        category: this.category,
        barcode: this.barcode,
        price: this.price,
        business_id: localStorage.getItem("business_id"),
        base64data: this.base64data

      }

      await this.http.postData("add-product.php",data).subscribe({
        next: data =>{
          this.global.loading = false
          if(data.body.message =="success"){
            Swal.fire(
              'Good job!',
              'Successfully Added!',
              'success'
            ).then(() =>{
               delete(this.productname)
               delete(this.stocks)
               delete(this.category)
               delete(this.barcode)
               delete(this.price)
            })
            this.location.back()
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href>Why do I have this issue?</a>'
            })
          }

        },onerror: error =>{
          this.global.loading = false
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


  open(event){
    console.log(event)

  }


}
