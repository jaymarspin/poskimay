import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { GlobalService } from 'src/app/services/global.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-time-log-view',
  templateUrl: './time-log-view.component.html',
  styleUrls: ['./time-log-view.component.scss'],
})
export class TimeLogViewComponent implements OnInit {
  @Input() id: any;
  @Input() timeID: any;
  @Input() name: any;
  logData: any;
  inpic: any;
  outpic: any;

  defaultImage: any;
  constructor(public http: HttpService,public global: GlobalService) {
    this.defaultImage = 'assets/no_image.png';
   }

  ngOnInit() {

    this.loadData().then(() =>{
    });
  }
  async loadData(){
   await this.http.getData(`get-time-log.php?id=${this.id}&timeid=${this.timeID}`).subscribe({
      next: data => {
        this.logData = JSON.parse(JSON.stringify(data));
        console.log(this.logData);
        _.forEach(this.logData.attendancePic, value =>{
          if (value.in_out === 'time in') {
            this.inpic = value.imagePath;
          } else if(value.in_out === 'time out'){
            this.outpic = value.imagePath;
          }
        });
      }, error: err => {
        console.log(err);
      }
    });
  }
  async viewImg(src){
    const images: any = new Array();
  await images.push({src});
  console.log(images);
  this.global.lightBoxOpen(images,0);
  }

}
