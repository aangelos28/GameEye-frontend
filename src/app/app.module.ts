import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {CoreModule} from './core/core.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {NavigationModule} from './navigation/navigation.module';
import {MatDialogModule} from '@angular/material/dialog';
import { AddGameComponent } from './core/components/add-game/add-game.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { TopGamesComponent } from './core/components/top-games/top-games.component';

@NgModule({
    declarations: [
        AppComponent,
        AddGameComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        CoreModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        NavigationModule,
        MatDialogModule,
        MatInputModule,
        MatIconModule
    ],
    providers: [HttpClientModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
