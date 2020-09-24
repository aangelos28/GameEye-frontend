import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {auth, User} from 'firebase';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    public user: User = null;
    private user$: Observable<User> = this.authService.firebaseAuth.user;

    public idToken: string;

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

    public getIdTokenStringAsync(): Promise<string> {
        return new Promise(resolve => {
            resolve(this.user.getIdToken());
        });
    }

    public getIdTokenAsync(): Promise<auth.IdTokenResult> {
        return new Promise(resolve => {
            resolve(this.user.getIdTokenResult());
        });
    }

    public sendPasswordResetEmailAsync(email: string): Promise<any> {
        return this.authService.firebaseAuth.sendPasswordResetEmail(email);
    }
}
