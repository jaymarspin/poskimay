import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  loading:any
  constructor(private router: Router) {
    this.loading = false
   }

   routingGo(){
    if(localStorage.getItem("id")){
      this.router.navigate(["splash"],{replaceUrl: true})

    } 
   }
   routingBack(){
    if(!localStorage.getItem("id")){
      this.router.navigate(["splash"],{replaceUrl: true})

    } 
   }
}
