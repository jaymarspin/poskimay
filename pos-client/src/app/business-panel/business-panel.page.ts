import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../services/global.service'
import {HttpService} from '../services/http.service' 
import { Router } from '@angular/router'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-business-panel',
  templateUrl: './business-panel.page.html',
  styleUrls: ['./business-panel.page.scss'],
})
export class BusinessPanelPage implements OnInit {
  business:any
  constructor(private router: Router,public global: GlobalService,public http: HttpService) { }

  ngOnInit() { 
    localStorage.removeItem("last_path")
    this.global.routingBack()
    this.http.getData("get-businesses.php?id="+localStorage.getItem("id")).subscribe({
      next: data =>{
        console.log(data)
        this.business = data
      },error: err =>{
        console.log(err)
      }
    })
  }

  gofurther(){
    this.router.navigate(["add-business"])
  }

  openBusiness(business:any){
    this.setter(business).then(() =>{ 
      this.router.navigate(["owners-panel/employee"])
    })
  }

  async setter(business){
    localStorage.setItem("business_name",business.business_name)
    localStorage.setItem("business_id",business.id)
  }

}
