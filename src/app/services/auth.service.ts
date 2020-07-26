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

    public loginFirebaseEmailPassword(email: string, password: string) {
        return this.firebase.signInWithEmailAndPassword(email, password);
    }

    public loginFirebaseGoogle() {
        return this.firebase.signInWithRedirect(new GoogleAuthProvider());
    }

    public loginFirebaseMicrosoft() {
        return this.firebase.signInWithRedirect(new OAuthProvider("microsoft.com"));
    }

    public logoutFirebase() {
        return this.firebase.signOut();
    }
}
