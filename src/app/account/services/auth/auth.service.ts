import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase';

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
        return this.firebaseAuth.signInWithRedirect(new auth.GoogleAuthProvider());
    }

    public loginFirebaseMicrosoft(): Promise<any> {
        return this.firebaseAuth.signInWithRedirect(new auth.OAuthProvider('microsoft.com'));
    }

    public logoutFirebase(): Promise<any> {
        return this.firebaseAuth.signOut();
    }

    public createAccount(email: string, password: string): Promise<any> {
        return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
    }

    public reauthEmailPassword(user: User, password: string): Promise<auth.UserCredential> {
        const credential = auth.EmailAuthProvider.credential(user.email, password);
        return user.reauthenticateWithCredential(credential);
    }
}
