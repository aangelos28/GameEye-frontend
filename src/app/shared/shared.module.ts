import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TitlebarComponent} from './components/titlebar/titlebar.component';

@NgModule({
    declarations: [
        TitlebarComponent
    ],
    exports: [
        TitlebarComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule {}
