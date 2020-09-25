import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoDialogComponent} from './components/error-dialog/info-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

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
    ]
})
export class SharedModule {
}
