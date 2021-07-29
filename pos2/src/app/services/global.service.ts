import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  loading: any;
  constructor(private router: Router) {
    this.loading = false;
   }

   routingGo(){
    if(localStorage.getItem('id')){
      this.router.navigate(['splash'],{replaceUrl: true});

    }
   }
   routingBack(){
    if(!localStorage.getItem('id')){
      this.router.navigate(['splash'],{replaceUrl: true});

    }
   }



   async processimg(event){

     console.log(event);
    const filer = event.target.files[0];
    return await this.toBase64(filer);


  }

   toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
}
