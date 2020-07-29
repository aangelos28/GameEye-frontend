import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../authentication/services/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

    public isSidemenuVisible: boolean = false;

    constructor(public auth: AuthService, private router: Router) {
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

    logout(): void {
        this.toggle();
        this.auth.logoutFirebase().then(val =>
            this.router.navigate(["login"])
        )
    }
}
