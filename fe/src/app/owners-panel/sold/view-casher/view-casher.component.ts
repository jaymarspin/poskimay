import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-view-casher',
  templateUrl: './view-casher.component.html',
  styleUrls: ['./view-casher.component.scss'],
})
export class ViewCasherComponent implements OnInit {
  @Input() id: any;
  @Input() timestamp: any;
  constructor(public http: HttpService) { }

  ngOnInit() {
  }

}
