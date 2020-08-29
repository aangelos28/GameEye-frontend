import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {map, take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    public user: firebase.User = null;
    private user$: Observable<firebase.User> = this.authService.firebaseAuth.user;

    constructor(public authService: AuthService) {
        this.user$.subscribe(user =>
            this.user = user
        );
    }

    public getUserEmailAsync(): Promise<string> {
        return new Promise(resolve => {
            resolve(this.user.email);
        });
    }

    public getEmailVerifiedAsync(): Promise<boolean> {
        return new Promise(resolve => {
            resolve(this.user.emailVerified);
        });
    }

    public isLoggedInAndVerified(): Observable<boolean> {
        return this.user$.pipe(
            map(user => user != null && user.emailVerified)
        );
    }

    public getIdTokenAsync(): Promise<string> {
        return new Promise(resolve => {
            resolve(this.user.getIdToken());
        });
    }

    public sendPasswordResetEmailAsync(email: string): Promise<any> {
        return this.authService.firebaseAuth.sendPasswordResetEmail(email);
    }
}
