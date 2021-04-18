import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'
@Component({
  selector: 'app-owners-panel',
  templateUrl: './owners-panel.page.html',
  styleUrls: ['./owners-panel.page.scss'],
})
export class OwnersPanelPage implements OnInit {
  public _opened: boolean = true; 
  public _modeNum: number = 1;
  public _positionNum: number = 0;
  public _animate: boolean = true;
  public _closeOnClickOutside: boolean = false;
  public _MODES: Array<string> = ['over', 'push', 'slide'];
  public _POSITIONS: Array<string> = ['left', 'right', 'top', 'bottom'];
  public _menu: boolean;
  public isMenuActive : string;
  constructor( public router: Router) { }

  ngOnInit() {
 
   
  }


  gofurther(link){
    this.router.navigate([link])
  }
  private _toggleSidebar() {
    this._opened = !this._opened;
  }
  

  
}
 
