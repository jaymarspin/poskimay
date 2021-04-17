import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../services/global.service'
@Component({
  selector: 'app-owner-header',
  templateUrl: './owner-header.component.html',
  styleUrls: ['./owner-header.component.scss'],
})
export class OwnerHeaderComponent implements OnInit {

  constructor(public global: GlobalService) { }

  ngOnInit() {}

}
