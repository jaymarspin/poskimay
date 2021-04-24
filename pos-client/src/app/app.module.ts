import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient,HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
 
import {ComponentsModule} from './modules/components/components.module'
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
  
import { WebView } from '@ionic-native/ionic-webview/ngx';
 
 
import { ImagePicker } from '@ionic-native/image-picker/ngx'; 
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,BrowserAnimationsModule,ComponentsModule, 
    SuperTabsModule.forRoot()
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
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
