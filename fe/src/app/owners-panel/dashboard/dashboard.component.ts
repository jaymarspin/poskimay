import { Component, OnInit,OnDestroy } from '@angular/core';
import * as ApexCharts from 'apexcharts'
import {GlobalService} from '../../services/global.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit,OnDestroy {

  constructor(public global: GlobalService) { 
   
     
  }

  ngOnInit() {
    var options = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'sales',
        data: [30,40,45,50,49,60,70,91,125]
      }],
      xaxis: {
        categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
      }
    }
    
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    
    chart.render();
 
  }
  ngOnDestroy(){
    this.global.loading = false
  }

}
