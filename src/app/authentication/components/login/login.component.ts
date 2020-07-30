import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm = new FormGroup({
        "email": new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        "password": new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ])
    });

    signupForm = new FormGroup({
        "email": new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        "password": new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ])
    });

    constructor(public auth: AuthService, private router: Router, private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
    }

    get emailLogin() {
        return this.loginForm.get("email");
    }

    get passwordLogin() {
        return this.loginForm.get("password");
    }

    get emailSignup() {
        return this.signupForm.get("email");
    }

    get passwordSignup() {
        return this.signupForm.get("password");
    }

    public loginEmailPassword(): void {
        const email: string = this.emailLogin.value;
        const password: string = this.passwordLogin.value;

        this.auth.loginFirebaseEmailPassword(email, password).then(cred => {
            this.auth.firebaseAuth.currentUser.then(user => {
                if (user.emailVerified) {
                    this.router.navigate(["dashboard"]);
                } else {
                    user.sendEmailVerification().then(() =>
                        this.router.navigate(["verifyEmail"])
                    );
                }
            })
        }).catch(err =>
            this.snackBar.open("Invalid login credentials. Either your email or password are wrong.", "X", {
                duration: 5000,
                panelClass: ["error-snackbar", "mat-warn"]
            })
        );
    }

    public loginGoogle(): void {
        this.auth.loginFirebaseGoogle().then(val =>
            this.router.navigate(["dashboard"])
        )
    }

    public loginMicrosoft(): void {
        this.auth.loginFirebaseMicrosoft().then(val =>
            this.router.navigate(["dashboard"])
        );
    }

    public signUp(): void {
        const email = this.emailSignup.value;
        const password = this.passwordSignup.value;

        this.auth.createAccount(email, password).then(val =>
            this.auth.firebaseAuth.currentUser.then(user => {
                user.sendEmailVerification().then(() =>
                    this.router.navigate(["verifyEmail"])
                )
            })
        ).catch(err =>
            this.snackBar.open("Failed to create account.\n" + err, "X", {
                duration: 8000,
                panelClass: ["error-snackbar", "mat-warn"]
            })
        )
    }
}
