import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient,HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {ComponentsModule} from './modules/components/components.module'
import { OwnersComponentModule } from './modules/owners-component/owners-component.module'
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

import { WebView } from '@ionic-native/ionic-webview/ngx';


import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),AppRoutingModule,HttpClientModule,BrowserAnimationsModule,ComponentsModule,OwnersComponentModule,
    SuperTabsModule.forRoot(),

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    HttpClient,
    Camera,
    WebView,
    ImagePicker,
    Crop,
    File,
    Base64,
    PhotoViewer,
    SQLite,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],


})
export class AppModule {}
