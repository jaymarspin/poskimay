import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { HttpService } from '../../../services/http.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products-sold',
  templateUrl: './products-sold.component.html',
  styleUrls: ['./products-sold.component.scss'],
})
export class ProductsSoldComponent implements OnInit {
  @Input() id;
  sold: any;
  soldcount: any;
  defaultImage = 'https://www.placecage.com/1000/1000';
  image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';

  constructor(
    public global: GlobalService,
    public http: HttpService,
  ) {
    this.sold = new Array();
  }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    // ?limit="+this.limit+"&page="+pager+"&filter="+this.filter
    this.global.loading = true;
    this.http
      .getData(
        `get-each-sold.php?id=${this.id}`
      )
      .subscribe({
        next: (data) => {
          this.sold = new Array();

          const result = JSON.parse(JSON.stringify(data));
          this.sold = result;
          this.global.loading = false;
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
            footer: ' ',
          });
        },
      });
  }
  async viewimg(src) {
    const images: any = new Array();
    await images.push({ src });
    console.log(images);
    this.global.lightBoxOpen(images, 0);
  }

}
