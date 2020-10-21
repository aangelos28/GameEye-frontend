import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth/auth.service';
import {AccountService} from '../../services/account/account.service';
import {RedirectDataService} from '../../../shared/services/redirect-data.service';

@Injectable({
    providedIn: 'root'
})
export class UserCreatedGuard implements CanActivate {

    constructor(private httpClient: HttpClient, private router: Router, private accountService: AccountService,
                private authService: AuthService, private redirectDataService: RedirectDataService) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.redirectDataService.isPersisted()) {
            this.redirectDataService.readFromLocalStorage();
            if (this.redirectDataService.data.checkCreateUserBackend === true) {
                return this.accountService.checkCreateUserBackend().pipe(
                    tap(existsOrCreated => {
                        if (existsOrCreated) {
                            this.redirectDataService.reset();
                        } else {
                            this.navigateToLogin();
                        }
                    })
                );
            }
        } else {
            return true;
        }
    }

    private navigateToLogin(): void {
        this.authService.logoutFirebase().then(() =>
            this.router.navigate(['login']).then(() =>
                window.location.reload()
            )
        );
    }
}
