import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../services/global.service';
import {HttpService} from '../services/http.service';
import {Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  uname: any;
  password: any;

  accountType: any;
  constructor(private router: Router,public global: GlobalService,public http: HttpService) {
    this.accountType = 'employee';
  }

  ngOnInit() {

  }
  trigger(e): any{

  }
  async setter(id){

    localStorage.setItem('accountType',this.accountType);
    return await localStorage.setItem('id',id);
  }
  login(){
    console.log(this.accountType);
    if(this.uname && this.password && this.accountType){
      const data = {
        username: this.uname,
        password: this.password,
        accountType: this.accountType
      };
      console.log(data);
      this.http.postData('signin.php',data).subscribe({
        next: datas =>{
          console.log(datas.body);
          if(datas.body.message === 'success'){

            Swal.fire(
              'Good job!',
              'You clicked the button!',
              'success'
            ).then(() =>{
              this.setter(datas.body.id).then(() =>{
                if(this.accountType === 'owner'){
                  this.router.navigate(['splash'],{replaceUrl: true});
                }else{
                  this.router.navigate(['home'],{replaceUrl: true});
                }


              });

            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: datas.body.message,
              footer: ' '
            });
          }
        },onerror: error =>{

        }
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Complete the fields',
        footer: ' '
      });
    }
  }

}
