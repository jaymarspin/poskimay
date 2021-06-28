import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../../../services/global.service' 
import {HttpService} from '../../../../services/http.service'
import { PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {

 
  
  constructor(public global: GlobalService,public http: HttpService,public popoverController: PopoverController) {
    
   }

  ngOnInit() {
 
  }
 
}
