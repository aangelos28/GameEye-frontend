import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {SidemenuComponent} from "./components/sidemenu/sidemenu.component";
import {RouterModule} from "@angular/router";
import {MatRippleModule} from "@angular/material/core";

@NgModule({
    declarations: [
        NavbarComponent,
        SidemenuComponent
    ],
    exports: [
        NavbarComponent,
        SidemenuComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatRippleModule
    ]
})
export class NavigationModule {}
