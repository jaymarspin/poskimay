import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-sale-note',
  templateUrl: './sale-note.component.html',
  styleUrls: ['./sale-note.component.scss'],
})
export class SaleNoteComponent implements OnInit {
  @Input() notes: any;
  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}

  save() {
    this.popoverController.dismiss({ note: this.notes });
  }
}
