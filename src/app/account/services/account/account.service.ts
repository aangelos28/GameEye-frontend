import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {auth, User} from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    public user: User = null;
    public user$: Observable<User> = this.authService.firebaseAuth.user;
    public isLoggedInAndVerified: BehaviorSubject<boolean>;

    constructor(public authService: AuthService) {
        this.isLoggedInAndVerified = new BehaviorSubject<boolean>(false);

        this.user$.subscribe(user => {
            this.user = user;
            this.isLoggedInAndVerified.next(user !== null && user.emailVerified);
        });
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
