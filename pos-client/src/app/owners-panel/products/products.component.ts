import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import {Router } from '@angular/router'
import {ProductActionsComponent} from '../product-actions/product-actions.component'
import {GlobalService} from '../../services/global.service' 
import {HttpService} from '../../services/http.service'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  employee:any
  products:any
  products_count

  page:number
   limit:number
   pagebtntmp:any
   pagebtn:any
  constructor(public global: GlobalService,public http: HttpService,private router: Router ,public popoverController: PopoverController) {
    this.products = new Array()
   this.pagebtn = new Array()

    this.page = 1
    this.limit = 10
    
   }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ProductActionsComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  ngOnInit() {
    this.loadData()
  }
  loadData(){
    // ?limit="+this.limit+"&page="+pager+"&filter="+this.filter
    this.global.loading = true
    this.http.getData("get-products.php?id="+localStorage.getItem("business_id")+"&limit="+this.limit+"&page="+this.page).subscribe({
      next: data =>{

        this.products = new Array()
     
        let result = JSON.parse(JSON.stringify(data));
        this.products_count = result.products_count
         let length = result.products.length
         
         this.pagebtntmp =  this.products_count / this.limit
         this.pagebtn = Array()
         for(var i = 1;i < this.pagebtntmp + 1;i++){
           this.pagebtn.push(i)
         }
            for(var i =0;i < length;i++){
          this.products.push(result.products[i])
          console.log(this.products)
      }
      this.global.loading = false
      
    }
    })
    
    // this.http.getData("get-products.php?id="+localStorage.getItem("business_id")).subscribe({
    //   next: data =>{
    //     console.log(data)
    //     for(var i =0;i < data.body;i++){
    //       this.products.push(data.body[i])
    //       console.log(this.products)
    //     }

    //   },onerror: error =>{
    //     console.log(error)
    //   }
    // })
  }
  addemployee(){
      
  }

  pager(page){

    this.page = page
    this.loadData()
  }

  gofurther(link){
    this.router.navigate([link])
  }


}
