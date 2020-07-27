import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {AngularFireAuth} from "@angular/fire/auth";
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import * as firebase from 'firebase';
import OAuthProvider = firebase.auth.OAuthProvider;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(public firebase: AngularFireAuth, private router: Router) {
    }

    public loginFirebaseEmailPassword(email: string, password: string): Promise<any> {
        return this.firebase.signInWithEmailAndPassword(email, password);
    }

    public loginFirebaseGoogle(): Promise<any> {
        return this.firebase.signInWithRedirect(new GoogleAuthProvider());
    }

    public loginFirebaseMicrosoft(): Promise<any> {
        return this.firebase.signInWithRedirect(new OAuthProvider("microsoft.com"));
    }

    public logoutFirebase(): Promise<any> {
        return this.firebase.signOut();
    }

    public createAccount(email: string, password: string): Promise<any> {
        return this.firebase.createUserWithEmailAndPassword(email, password);
    }
}
