import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../account/services/auth/auth.service';
import {Router} from '@angular/router';
import {AccountService} from '../../../account/services/account/account.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit, OnDestroy {

    public isSidemenuVisible = false;

    public isLoggedInAndVerified: boolean = null;

    private subscriptions = new Subscription();

    constructor(public accountService: AccountService, private authService: AuthService, private router: Router) {
    }

    ngOnInit(): void {
        this.subscriptions.add(this.accountService.isLoggedInAndVerified.subscribe(isLoggedInAndVerified =>
            this.isLoggedInAndVerified = isLoggedInAndVerified
        ));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
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
        this.authService.logoutFirebase().then(val =>
            this.router.navigate(['login'])
        );
    }
}
