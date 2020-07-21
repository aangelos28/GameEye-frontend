import {Component, OnInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import {SidemenuComponent} from "../sidemenu/sidemenu.component";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    @ViewChild(SidemenuComponent) sidemenu: SidemenuComponent;

    constructor(private location: Location) {}

    ngOnInit(): void {
    }

    goBack(): void {
        this.location.back();
    }
}
