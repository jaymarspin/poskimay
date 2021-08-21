import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-attendance-actions',
  templateUrl: './attendance-actions.component.html',
  styleUrls: ['./attendance-actions.component.scss'],
})
export class AttendanceActionsComponent implements OnInit {
  @Input() id: any;
  constructor(public popoverController: PopoverController) {}

  ngOnInit() {}

  async viewCalendar(ev: any) {
    const popover = await this.popoverController.create({
      component: AttendanceActionsComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: {
        id: this.id,
      },
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
