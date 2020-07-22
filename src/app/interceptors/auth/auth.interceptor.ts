import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../../services/auth.service";
import {switchMap} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.authService.accessToken$.pipe(switchMap((accessToken: string) => {
            console.log(accessToken);
            if (accessToken) {
                const authRequest = request.clone({
                    headers: request.headers.set("Authorization", "Bearer " + accessToken)
                });

                return next.handle(authRequest);
            }
            return next.handle(request);
        }));
    }
}
