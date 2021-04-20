import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../services/global.service'
import {HttpService} from '../services/http.service'
import { PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  uname:any
  password:any
  constructor(public global: GlobalService,public http: HttpService) { }

  ngOnInit() {


  }

  login(){
    if(this.uname && this.password){
      let data = {
        username: this.uname,
        password: this.password
      }
      console.log(data)
      this.http.postData("signin.php",data).subscribe({
        next: data =>{
          if(data.body.message == 'success'){
            Swal.fire(
              'Good job!',
              'You clicked the button!',
              'success'
            ) 
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
