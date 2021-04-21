import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../services/global.service'
import {HttpService} from '../services/http.service' 

import Swal from 'sweetalert2'
import {Location} from '@angular/common';
@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.page.html',
  styleUrls: ['./add-business.page.scss'],
})
export class AddBusinessPage implements OnInit {
  business:any
  businesstype:any

  categories:any
  constructor(private _location: Location,public global: GlobalService,public http: HttpService) { }

  ngOnInit() {
 
    this.http.getData("get-business-category.php").subscribe({
      next: data =>{
        console.log(data)
        this.categories = data
      },error: err =>{
        console.log(err)
      }
    })

  }

  done(){
    if(this.business && this.businesstype){
      let data = {
        owners_id: localStorage.getItem("id"),
        business: this.business,
        businesstype: this.businesstype
      }
      console.log(data)
      this.http.postData("add-business.php",data).subscribe({
        next: data =>{
          if(data.body.message == 'success'){
            Swal.fire(
              'Good job!',
              'You clicked the button!',
              'success'
            ).then(() =>{
              this._location.back();
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.body.message,
              footer: ' '
            })
          }
        },onerror: error =>{

        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Complete the fields',
        footer: ' '
      })
    }
  }

}
