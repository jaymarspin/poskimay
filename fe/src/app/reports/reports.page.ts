import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Printd } from 'printd';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
 cssText = `
  h1 {
    color: black;
    font-family: sans-serif;
  }
`;


  constructor(public global: GlobalService) { }

  ngOnInit() {
  }
  print(){
    const d = new Printd();
    d.print( document.getElementById('print-section'), [ this.cssText ] );
        console.log(this.global.reportData);

  }
}
