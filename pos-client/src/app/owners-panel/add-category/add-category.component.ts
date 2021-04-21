import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../services/global.service'
import {HttpService} from '../../services/http.service'
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  category:any
  constructor(public global: GlobalService,public http: HttpService,private popoverController: PopoverController) { }

  ngOnInit() {}

  submit(){ 
    if(this.category){
      this.global.loading = true
      let data = {
        id: 1,
        category: this.category
  
      }
      this.http.postData("add-category.php",data).subscribe({
        
        next: data => {
          
          this.global.loading = false
            if(data.body.message =="success"){
              this.popoverController.dismiss();
            }else{
              alert("something went wrong")
            }
        },
        error: error => {
          this.global.loading = false
            console.error('There was an error!', error);
        }
    })

    }
    
    // this.http.addPerson().subscribe(res =>{
    //   console.log(res)
    // })
  }

}
