import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatRippleModule} from "@angular/material/core";
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidemenuComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        MatSidenavModule,
        MatRippleModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
