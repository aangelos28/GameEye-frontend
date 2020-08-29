import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AngularFireAuth) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.auth.idToken.pipe(switchMap((idToken: string) => {
            if (idToken) {
                const authRequest = request.clone({
                    headers: request.headers.set('Authorization', 'Bearer ' + idToken)
                });

                return next.handle(authRequest);
            }
            return next.handle(request);
        }));
    }
}
