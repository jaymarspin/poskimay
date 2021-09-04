import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  getNow: any;
  constructor(private router: Router,public global: GlobalService) {
  }

  ngOnInit() {
    this.global.loading = false;
    const start = Date.now();
    setInterval(() =>{
      this.getNow = new Date().toLocaleString().replace(',','');
    });
  }

  signout(){
    localStorage.clear();
    this.router.navigate(['splash'],{replaceUrl: true});
  }

}
