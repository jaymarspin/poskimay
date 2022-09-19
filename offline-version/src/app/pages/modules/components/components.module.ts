import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../../components/header/header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxPaginationModule } from "ngx-pagination";
@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    IonicModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    NgxPaginationModule
  ],
  exports: [HeaderComponent],
})
export class ComponentsModule {}
