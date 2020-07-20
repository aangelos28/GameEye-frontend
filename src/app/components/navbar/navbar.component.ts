import {Component, OnInit, ViewChild} from '@angular/core';
import {SidemenuComponent} from "../sidemenu/sidemenu.component";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    @ViewChild(SidemenuComponent) sidemenu: SidemenuComponent;

    constructor() {}

    ngOnInit(): void {
    }
}
