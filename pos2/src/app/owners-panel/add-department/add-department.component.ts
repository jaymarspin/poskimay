import { Component, OnInit } from '@angular/core'; 
import {GlobalService} from '../../services/global.service'
import {HttpService} from '../../services/http.service'
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss'],
})
export class AddDepartmentComponent implements OnInit {
  department:any
  constructor(public global: GlobalService,public http: HttpService,private popoverController: PopoverController) { }

  ngOnInit() {}

  submit(){ 
    if(this.department){
      this.global.loading = true
      let data = {
        id: 1,
        department: this.department
  
      }
      this.http.postData("add-department.php",data).subscribe({
        
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
