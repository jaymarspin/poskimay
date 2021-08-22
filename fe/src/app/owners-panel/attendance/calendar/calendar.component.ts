import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() id: any;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    events: [
      { title: 'event 1', date: '2021-08-01'},
      { title: 'event 2', date: '2021-08-01' },
      { title: 'event 2', date: '2021-08-02' }
    ],
    eventClick: (event) =>{
      this.sample();
    },
  };
  constructor() { }

  ngOnInit() {
    setTimeout( () => {
      window.dispatchEvent(new Event('resize'));
  }, 1);
  }
  sample(){
    alert('awagaw');
  }
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }
  // https://fullcalendar.io/docs/angular

}
