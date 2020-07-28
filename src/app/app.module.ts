import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HttpClientModule} from "@angular/common/http";
import {AngularFireModule} from "@angular/fire";
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        SharedModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        CoreModule
    ],
    providers: [HttpClientModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
