import {Injectable} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";
import * as firebase from "firebase";
import {map, take} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    public user: Observable<firebase.User> = this.authService.firebaseAuth.user;

    constructor(public authService: AuthService) {
    }

    public getUserEmailAsync(): Promise<string> {
        return new Promise(resolve => {
            this.user.subscribe(user => {
                resolve(user.email);
            })
        });
    }

    public getEmailVerifiedAsync(): Promise<boolean> {
        return new Promise(resolve => {
            this.user.subscribe(user => {
                resolve(user.emailVerified);
            })
        });
    }

    public isLoggedInAndVerified(): Observable<boolean> {
        return this.user.pipe(
            map(user => user != null && user.emailVerified)
        )
    }

    public getIdTokenAsync(): Promise<string> {
        return new Promise(resolve => {
            this.user.subscribe(user => {
                resolve(user.getIdToken());
            })
        });
    }

    public sendPasswordResetEmailAsync(email: string): Promise<any> {
        return this.authService.firebaseAuth.sendPasswordResetEmail(email);
    }
}
