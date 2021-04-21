import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../services/global.service'
import {HttpService} from '../services/http.service'
import {Router } from '@angular/router'

import Swal from 'sweetalert2'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  uname:any
  password:any
  constructor(private router: Router,public global: GlobalService,public http: HttpService) { }

  ngOnInit() {
    this.global.routingGo()

  }
  async setter(id){
    return await localStorage.setItem("id",id)
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
          console.log(data.body)
          if(data.body.message == 'success'){

            Swal.fire(
              'Good job!',
              'You clicked the button!',
              'success'
            ).then(() =>{
              this.setter(data.body.id).then(() =>{
                this.router.navigate(["business-panel"],{replaceUrl: true})
              })
              
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
