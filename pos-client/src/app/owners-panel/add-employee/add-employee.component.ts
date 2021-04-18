import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../services/global.service'
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {

  constructor(public global: GlobalService) {
    
   }

  ngOnInit() {
     
  }

  next(){
     
  }

}
