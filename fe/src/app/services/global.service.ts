import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  loading: any;
  sales: any;
  constructor(private router: Router, private lightbox: Lightbox) {
    this.loading = false;
    this.sales = new Array();
  }
  lightBoxOpen(images, index) {
    this.lightbox.open(images, index);
  }
  routingGo() {
    if (localStorage.getItem('id')) {
      this.router.navigate(['splash'], { replaceUrl: true });
    }
  }
  routingBack() {
    if (!localStorage.getItem('id')) {
      this.router.navigate(['splash'], { replaceUrl: true });
    }
  }

  async processimg(event) {
    console.log(event);
    const filer = event.target.files[0];
    return await this.toBase64(filer);
  }

  toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  round2Fixed(value) {
    value = +value;

    if (isNaN(value)) {
      return NaN;
    }

    // Shift
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? +value[1] + 2 : 2)));

    // Shift back
    value = value.toString().split('e');
    return parseFloat(
      (+(value[0] + 'e' + (value[1] ? +value[1] - 2 : -2))).toFixed(2)
    );
  }
  formattedDate(d = new Date()) {
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
      .map((n) => (n < 10 ? `0${n}` : `${n}`))
      .join('-');
  }
}
