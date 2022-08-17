import { Router } from '@angular/router';

export class Routing {
  constructor(private router: Router) {}

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
}
