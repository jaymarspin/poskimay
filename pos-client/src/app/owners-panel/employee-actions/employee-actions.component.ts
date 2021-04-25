import { Component, OnInit,Input } from '@angular/core';
import {Router } from '@angular/router'
import { PopoverController } from '@ionic/angular';
import {GlobalService} from '../../services/global.service' 
import {HttpService} from '../../services/http.service' 
import Swal from 'sweetalert2'
@Component({
  selector: 'app-employee-actions',
  templateUrl: './employee-actions.component.html',
  styleUrls: ['./employee-actions.component.scss'],
})
export class EmployeeActionsComponent implements OnInit {
  @Input() id;
  constructor(public http: HttpService,public global: GlobalService,private popover: PopoverController,private router: Router) { }

  ngOnInit() {
    console.log(this.id)
  }

  gofurther(link){
    this.popover.dismiss()
    this.router.navigate([link,this.id])
  }

}
