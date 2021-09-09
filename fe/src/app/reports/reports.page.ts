import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  constructor(public global: GlobalService) { }

  ngOnInit() {
    console.log(this.global.reportData);
  }

}
