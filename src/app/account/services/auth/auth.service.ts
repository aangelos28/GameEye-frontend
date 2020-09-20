import {Injectable} from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import * as firebase from 'firebase';
import OAuthProvider = firebase.auth.OAuthProvider;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(public firebaseAuth: AngularFireAuth) {
    }

    public loginFirebaseEmailPassword(email: string, password: string): Promise<any> {
        return this.firebaseAuth.signInWithEmailAndPassword(email, password);
    }

    public loginFirebaseGoogle(): Promise<any> {
        return this.firebaseAuth.signInWithRedirect(new GoogleAuthProvider());
    }

    public loginFirebaseMicrosoft(): Promise<any> {
        return this.firebaseAuth.signInWithRedirect(new OAuthProvider('microsoft.com'));
    }

    public logoutFirebase(): Promise<any> {
        return this.firebaseAuth.signOut();
    }

    public createAccount(email: string, password: string): Promise<any> {
        return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
    }
}
