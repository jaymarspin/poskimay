import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { HttpService } from '../../services/http.service';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  category: any;
  constructor(
    public global: GlobalService,
    public http: HttpService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {}

  submit() {
    alert(this.category);
    if (this.category) {
      this.global.loading = true;
      const data = {
        id: localStorage.getItem('business_id'),
        category: this.category,
      };
      this.http.postData('add-category.php', data).subscribe({
        next: (datas) => {
          this.global.loading = false;
          if (datas.body.message === 'success') {
            this.popoverController.dismiss();
          } else {
            alert('something went wrong');
          }
        },
        error: (error) => {
          console.log(error);
          this.global.loading = false;
          console.error('There was an error!', error);
        },
      });
    }

    // this.http.addPerson().subscribe(res =>{
    //   console.log(res)
    // })
  }
}
