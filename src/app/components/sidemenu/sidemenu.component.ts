import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

    public isSidemenuVisible: boolean = false;

    constructor(public auth: AuthService) {
    }

    ngOnInit(): void {
    }

    toggle(): void {
        this.isSidemenuVisible = !this.isSidemenuVisible;
    }

    toggleOverlay(): void {
        if (this.isSidemenuVisible) {
            this.toggle();
        }
    }
}
