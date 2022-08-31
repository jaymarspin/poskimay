import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-owner-header',
  templateUrl: './owner-header.component.html',
  styleUrls: ['./owner-header.component.scss'],
})
export class OwnerHeaderComponent implements OnInit {
  constructor(public router: Router, public global: GlobalService) {}

  ngOnInit() {}

  signout() {
    localStorage.clear();
    this.router.navigate(['splash'], { replaceUrl: true });
  }
}
