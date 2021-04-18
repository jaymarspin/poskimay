import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../services/global.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(public global: GlobalService) { 
    
  }

  ngOnInit() {
    this.global.loading = false
  }

}
