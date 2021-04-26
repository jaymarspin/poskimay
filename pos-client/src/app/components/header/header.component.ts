import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../services/global.service'
import {Router } from '@angular/router'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,public global: GlobalService) { 
    
  }

  ngOnInit() {
    this.global.loading = false
  }

  signout(){
    localStorage.clear()
    this.router.navigate(['splash'],{replaceUrl: true})
  }

}
