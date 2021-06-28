import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  loading:any
  constructor(private router: Router,private photoViewer: PhotoViewer) {
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

   viewPhoto(image,title){
    this.photoViewer.show(image, title, {share: false});
   }
}
