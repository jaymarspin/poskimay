import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-time-log-view',
  templateUrl: './time-log-view.component.html',
  styleUrls: ['./time-log-view.component.scss'],
})
export class TimeLogViewComponent implements OnInit {
  @Input() id: any;
  @Input() timeID: any;
  constructor(public http: HttpService) { }

  ngOnInit() {
    alert(this.timeID);
    this.loadData().then(() =>{
    });
  }
  async loadData(){
    await this.http.getData(`get-time-log.php?id=${this.id}&timeid=${this.timeID}`).subscribe({
      next: data =>{
        console.log(data);
        },error: err =>{
          console.log(err);
      }
    });
  }

}
