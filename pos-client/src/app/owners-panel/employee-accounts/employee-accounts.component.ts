import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../services/global.service' 
import {HttpService} from '../../services/http.service' 
import { Router,ActivatedRoute } from '@angular/router' 
import Swal from 'sweetalert2'
@Component({
  selector: 'app-employee-accounts',
  templateUrl: './employee-accounts.component.html',
  styleUrls: ['./employee-accounts.component.scss'],
})
export class EmployeeAccountsComponent implements OnInit {
  id:any
  username:any
  password:any

  employee:any
  public form = [
    { val: 'Cashier', isChecked: false },
    { val: 'Inventory', isChecked: false } 
  ];
  constructor(private snapshopt: ActivatedRoute,public http: HttpService,public global: GlobalService) { }

  ngOnInit() {
    this.id = this.snapshopt.snapshot.paramMap.get("id")
    this.http.getData("get-employee-data.php?id="+this.id).subscribe({
      next: data =>{
         
        console.log(data)
        let result = JSON.parse(JSON.stringify(data));
        for(var i = 0;i < this.form.length;i++){
          for(var x = 0;x < result.employeeRoles.length;x++){
            if(result.employeeRoles[x] == this.form[i].val){
              this.form[i].isChecked = true
            }else{
              this.form[i].isChecked = false
            }
          }
        }
        this.global.loading = false
        this.employee = data 
      }
    })
  }
  
  submit(){
    console.log(this.form)
    if(this.username && this.password){
      this.global.loading = true
      let data = {
        id: this.id,
        username: this.username,
        password: this.password,
        roles: this.form
      }

      this.http.postData("add-employee-account.php",data).subscribe({
        next: data =>{
          console.log(data)

          let result = JSON.parse(JSON.stringify(data));
          
          
          if(result.body.message =='success'){
            Swal.fire(
              'Good job!',
              'Successfully added!',
              'success'
            )
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Error Occured, Please try again later",
              footer: ' '
            })
          }
        },error: error =>{
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
            footer: ' '
          })
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Please complete the fields",
        footer: ' '
      })
    }
  }

}
