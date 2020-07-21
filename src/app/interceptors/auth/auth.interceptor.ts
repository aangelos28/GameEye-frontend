import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
            const authRequest = request.clone({
                headers: request.headers.set("Authorization", "Bearer " + accessToken)
            });

            return next.handle(authRequest);
        }
        return next.handle(request);
    }
}
