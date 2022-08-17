import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { PopoverController } from '@ionic/angular';
import { ReportFrameComponent } from './report-frame/report-frame.component';
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

  constructor(
    public router: Router,
    public global: GlobalService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {}

  gofurther(link) {
    this.router.navigate([link]);
  }
  _toggleSidebar() {
    // eslint-disable-next-line no-underscore-dangle
    this._opened = !this._opened;
  }

  async reports(ev: any) {
    const popover = await this.popoverController.create({
      component: ReportFrameComponent,
      cssClass: 'my-custom-class',
      translucent: true,
    });
    await popover.present();
    await popover.onDidDismiss();
  }
}
