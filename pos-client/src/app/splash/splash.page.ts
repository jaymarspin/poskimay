import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router'
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // localStorage.clear()
    if(localStorage.getItem("id")){
      this.router.navigate(["business-panel"],{replaceUrl: true})

    }else{
      this.router.navigate(["signin"],{replaceUrl: true})
    }
  }

}
