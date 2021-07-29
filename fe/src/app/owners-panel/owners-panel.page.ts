import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-owners-panel',
  templateUrl: './owners-panel.page.html',
  styleUrls: ['./owners-panel.page.scss'],
})
export class OwnersPanelPage implements OnInit {
  public _opened = true;
  public _modeNum = 1;
  public _positionNum = 0;
  public _animate = true;
  public _closeOnClickOutside = false;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public _MODES: Array<any> = ['over', 'push', 'slide'];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public _POSITIONS: Array<any> = ['left', 'right', 'top', 'bottom'];
  public _menu: boolean;
  public isMenuActive: string;

  constructor(public router: Router) { }

  ngOnInit() {

  }


  gofurther(link){
    this.router.navigate([link]);
  }
   _toggleSidebar() {
    // eslint-disable-next-line no-underscore-dangle
    this._opened = !this._opened;
  }



}

