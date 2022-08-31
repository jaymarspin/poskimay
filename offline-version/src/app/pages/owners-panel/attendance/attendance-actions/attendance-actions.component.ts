import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CalendarComponent } from '../calendar/calendar.component';
@Component({
  selector: 'app-attendance-actions',
  templateUrl: './attendance-actions.component.html',
  styleUrls: ['./attendance-actions.component.scss'],
})
export class AttendanceActionsComponent implements OnInit {
  @Input() id: any;
  @Input() rendered: any;
  @Input() notimeout: any;
  @Input() name: any;
  constructor(public popoverController: PopoverController) {}

  ngOnInit() {
    console.log(this.notimeout);
  }

  async viewCalendar() {
    this.popoverController.dismiss();
    const popover = await this.popoverController.create({
      component: CalendarComponent,
      cssClass: 'attendance-popover',
      translucent: true,
      componentProps: {
        id: this.id,
        rendered: this.rendered,
        notimeout: this.notimeout,
        name: this.name,
      },
    });
    await popover.present();
  }
}
