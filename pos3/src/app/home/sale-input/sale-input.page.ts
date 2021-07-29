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

    // this.sqlite.create({
    //   name: 'data.db',
    //   location: 'default'
    // })
    //   .then((db: SQLiteObject) => {


    //     db.executeSql('create table danceMoves(name VARCHAR(32))', [])
    //       .then(() => console.log('Executed SQL'))
    //       .catch(e => console.log(e));


    //   })
    //   .catch(e => console.log(e));

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
