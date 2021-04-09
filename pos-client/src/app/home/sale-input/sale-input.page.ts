import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-sale-input',
  templateUrl: './sale-input.page.html',
  styleUrls: ['./sale-input.page.scss'],
})
export class SaleInputPage implements OnInit {
  sale:any
  constructor() { 
    this.sale = Array()
    for(var i = 0;i < 20;i++){
      this.sale.push({
        "product": "awdadwa"
      })
    }
     
  }

  ngOnInit() {
    
  }
  delete(){
    Swal.fire({
      title: 'Are you sure?',
      backdrop: false,
      text: "You won't be able to revert this!",
      icon: 'warning',
    
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

}
