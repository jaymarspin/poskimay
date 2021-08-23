import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { PopoverController } from '@ionic/angular';
import { TimeLogViewComponent } from '../time-log-view/time-log-view.component';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() id: any;
  @Input() rendered: any;
  @Input() notimeout: any;
  @Input() name: any;
  calendarOptions: CalendarOptions;
  events: any;
  constructor(private popoverController: PopoverController) {
    this.events = Array();
   }

  ngOnInit() {
    setTimeout( () => {
      window.dispatchEvent(new Event('resize'));
  }, 1);
  console.log(this.notimeout);
  for (const iterator of this.rendered) {
    this.events.push({ title: 'in', date: iterator.time_in,id: iterator.id });
    this.events.push({ title: 'out', date: iterator.time_out,id: iterator.id});
  }
  for (const iterator of this.notimeout) {
    this.events.push({ title: 'in', date: iterator.time_in, id: iterator.id });
  }

  this.calendarOptions = {
    initialView: 'dayGridMonth',
    // dateClick: null,
    events: this.events,
    eventClick: (info) =>{
      this.presentPopover(info.event.id);
    },
  };
  }
  handleDateClick(arg) {
    this.presentPopover(arg.dateStr);
    // alert('date click! ' + arg.dateStr);
  }

  async presentPopover(id) {

    const popover = await this.popoverController.create({
      component: TimeLogViewComponent,
      cssClass: 'my-custom-class',
      translucent: true,
      componentProps: {
        id: this.id,
        timeID: id,
        name: this.name
      },
    });
    await popover.present();
  }
  // https://fullcalendar.io/docs/angular

}
