import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {auth, User} from 'firebase';
import {HttpClient} from '@angular/common/http';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    public user: User = null;
    public user$: Observable<User> = this.authService.firebaseAuth.user;
    public isLoggedInAndVerified: BehaviorSubject<boolean>;

    constructor(public authService: AuthService, private httpClient: HttpClient) {
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

    public checkCreateUserBackend(): Observable<boolean> {
        return this.httpClient.get<boolean>('/private/user/exists').pipe(
            switchMap(accountExists => {
                if (!accountExists) {
                    return this.httpClient.post('/private/user/create', null);
                } else {
                    return of(true);
                }
            }),
            switchMap(() => of(true)), // Account created
            catchError(() => of(false)), // Failed to check if account exists
        );
    }
}
