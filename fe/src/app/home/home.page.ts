import { Component } from '@angular/core';
import {HttpService} from '../services/http.service'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public service: HttpService) {
     
    // this.service.getData().subscribe(res =>{
    //   console.log(res)
    // },error =>{
    //   console.log(error)
    // })

    // this.service.addPerson().subscribe(res =>{

    // },error =>{
      
    // })
  }

}
 