import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoDialogComponent} from './components/error-dialog/info-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiInterceptor} from './interceptors/api/api.interceptor';

@NgModule({
    declarations: [
        InfoDialogComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    exports: [
        InfoDialogComponent
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: ApiInterceptor,
        multi: true
    }]
})
export class SharedModule {
}
