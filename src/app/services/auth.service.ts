import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';

import {from, of, Observable, BehaviorSubject, combineLatest, throwError} from 'rxjs';
import {tap, catchError, concatMap, shareReplay, share} from 'rxjs/operators';
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Create an observable of Auth0 instance of client
    auth0Client$ = (from(
        createAuth0Client({
            domain: "dev-cx4ng9g0.us.auth0.com",
            client_id: "aMoXHlnW7aHir2Bk7RN4G6x4c9s3x1bg",
            redirect_uri: `${window.location.origin}`
        })
    ) as Observable<Auth0Client>).pipe(
        shareReplay(1), // Every subscription receives the same shared value
        catchError(err => throwError(err))
    );

    // Define observables for SDK methods that return promises by default
    // For each Auth0 SDK method, first ensure the client instance is ready
    // concatMap: Using the client instance, call SDK method; SDK returns a promise
    // from: Convert that resulting promise into an observable
    isAuthenticated$ = this.auth0Client$.pipe(
        concatMap((client: Auth0Client) => from(client.isAuthenticated())),
        tap(res => this.loggedIn = res)
    );
    handleRedirectCallback$ = this.auth0Client$.pipe(
        concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
    );
    accessToken$ = this.auth0Client$.pipe(
        concatMap((client: Auth0Client) => from(client.getTokenSilently({audience: "/api"}))),
        share()
    );
    idTokenClaims$ = this.auth0Client$.pipe(
        concatMap((client: Auth0Client) => from(client.getIdTokenClaims())),
        share()
    );

    // Create subject and public observable of user profile data
    private userProfileSubject$ = new BehaviorSubject<any>(null);
    userProfile$ = this.userProfileSubject$.asObservable();

    // Local login variables
    public loggedIn: boolean = null;
    constructor(public firebase: AngularFireAuth, private router: Router) {
        // On initial load, check authentication state with authorization server
        // Set up local auth streams if user is already authenticated
        this.localAuthSetup();
        // Handle redirect from Auth0 login
        this.handleAuthCallback();
    }

    public loginFirebase(email: string, password: string) {
        return this.firebase.signInWithEmailAndPassword(email, password);
    }

    public logoutFirebase() {
        return this.firebase.signOut();
    }

    // When calling, options can be passed if desired
    // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
    getUser$(options?): Observable<any> {
        return this.auth0Client$.pipe(
            concatMap((client: Auth0Client) => from(client.getUser(options))),
            tap(user => this.userProfileSubject$.next(user))
        );
    }

    private localAuthSetup() {
        // This should only be called on app initialization
        // Set up local authentication streams
        const checkAuth$ = this.isAuthenticated$.pipe(
            concatMap((loggedIn: boolean) => {
                if (loggedIn) {
                    // If authenticated, get user and set in app
                    // NOTE: you could pass options here if needed
                    return this.getUser$();
                }
                // If not authenticated, return stream that emits 'false'
                return of(loggedIn);
            })
        );
        checkAuth$.subscribe();
    }

    public login(redirectPath: string = '/') {
        // A desired redirect path can be passed to login method
        // (e.g., from a route guard)
        // Ensure Auth0 client instance exists
        this.auth0Client$.subscribe((client: Auth0Client) => {
            // Call method to log in
            client.loginWithRedirect({
                redirect_uri: `${window.location.origin}`,
                appState: {target: redirectPath}
            });
        });
    }

    private handleAuthCallback() {
        // Call when app reloads after user logs in with Auth0
        const params = window.location.search;
        if (params.includes('code=') && params.includes('state=')) {
            let targetRoute: string; // Path to redirect to after login is processed
            const authComplete$ = this.handleRedirectCallback$.pipe(
                // Have client, now call method to handle auth callback redirect
                tap(cbRes => {
                    // Get and set target redirect route from callback results
                    targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
                }),
                concatMap(() => {
                    // Redirect callback complete; get user and login status
                    return combineLatest([
                        this.getUser$(),
                        this.isAuthenticated$
                    ]);
                })
            );
            // Subscribe to authentication completion observable
            // Response will be an array of user and login status
            authComplete$.subscribe(([user, loggedIn]) => {
                // Redirect to target route after callback processing
                this.router.navigate([targetRoute]);
            });
        }
    }

    public logout() {
        // Ensure Auth0 client instance exists
        this.auth0Client$.subscribe((client: Auth0Client) => {
            // Call method to log out
            client.logout({
                client_id: "aMoXHlnW7aHir2Bk7RN4G6x4c9s3x1bg",
                returnTo: `${window.location.href}`
            });
        });
    }
}
