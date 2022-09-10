import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SQLiteService } from "./services/sqlite.service";
import { DetailService } from "./services/detail.service";
import { InitializeAppService } from "./services/initialize.app.service";
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from "@angular/common/http";
import { MigrationService } from "./services/migrations.service";
import { ProductRepository } from "./repositories/product.repository";
import { DatabaseService } from "./services/database.service";
import { ProductDefaultQueryRepository } from "./repositories/product.default.query.repository";
import { SuperTabsModule } from "@ionic-super-tabs/angular";
import { LightboxModule } from "ngx-lightbox";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { NgxImageCompressService } from "ngx-image-compress";
import { environment } from "../environments/environment";
import { UserRepository } from "./repositories/users/users.repository";
import { productImageRepository } from "./repositories/product_images/product_images.repository";
export function initializeFactory(init: InitializeAppService) {
  return () => init.initializeApp();
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    LightboxModule,
    HttpClientModule,
    SuperTabsModule.forRoot(),
    BrowserAnimationsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),
  ],
  providers: [
    SQLiteService,
    DetailService,

    LightboxModule,
    DatabaseService,
    NgxImageCompressService,
    HttpClient,
    InitializeAppService,
    SuperTabsModule,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFactory,
      deps: [InitializeAppService],
      multi: true,
    },

    MigrationService,
    ProductRepository,
    productImageRepository,
    UserRepository,
    ProductDefaultQueryRepository,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
