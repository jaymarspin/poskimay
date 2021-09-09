import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-view-casher',
  templateUrl: './view-casher.component.html',
  styleUrls: ['./view-casher.component.scss'],
})
export class ViewCasherComponent implements OnInit {

  constructor(public http: HttpService) { }

  ngOnInit() {}

}
