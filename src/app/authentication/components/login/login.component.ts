import {Component, OnInit} from '@angular/core';
import {AbstractControl, Form, FormControl, FormGroup, Validators, ValidatorFn, FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

const PasswordValidator: ValidatorFn = (fg: FormGroup) => {
   const password = fg.get('password').value;
   const confirmPassword = fg.get('confirmPassword').value;
   return password !== null && confirmPassword !== null && password === confirmPassword
        ? null
        : { range: true };
};

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    loginForm: FormGroup;
    signupForm: FormGroup;

    constructor(public auth: AuthService, private router: Router, private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.loginForm = new FormGroup( {
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8)
            ])
        });

        this.signupForm = new FormGroup( {
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8)
            ]),
            confirmPassword: new FormControl('', [
                Validators.required,
                PasswordValidator,
            ])
        });
    }

    get emailLogin(): AbstractControl {
        return this.loginForm.get('email');
    }

    get passwordLogin(): FormControl {
        return this.loginForm.get('password') as FormControl;
    }

    get emailSignup(): AbstractControl {
        return this.signupForm.get('email');
    }

    get passwordSignup(): AbstractControl {
        return this.signupForm.get('password');
    }

    public loginEmailPassword(): void {
        const email: string = this.emailLogin.value;
        const password: string = this.passwordLogin.value;

        this.auth.loginFirebaseEmailPassword(email, password).then(cred => {
            this.auth.firebaseAuth.currentUser.then(user => {
                if (user.emailVerified) {
                    this.router.navigate(['dashboard']);
                } else {
                    user.sendEmailVerification().then(() =>
                        this.router.navigate(['verifyEmail'])
                    );
                }
            });
        }).catch(err =>
            this.snackBar.open('Invalid login credentials. Either your email or password are wrong.', 'X', {
                duration: 5000,
                panelClass: ['error-snackbar', 'mat-warn']
            })
        );
    }

    public loginGoogle(): void {
        this.auth.loginFirebaseGoogle().then(val =>
            this.router.navigate(['dashboard'])
        );
    }

    public loginMicrosoft(): void {
        this.auth.loginFirebaseMicrosoft().then(val =>
            this.router.navigate(['dashboard'])
        );
    }

    public signUp(): void {
        const email = this.emailSignup.value;
        const password = this.passwordSignup.value;

        this.auth.createAccount(email, password).then(val =>
            this.auth.firebaseAuth.currentUser.then(user => {
                user.sendEmailVerification().then(() =>
                    this.router.navigate(['verifyEmail'])
                );
            })
        ).catch(err =>
            this.snackBar.open('Failed to create account.\n' + err, 'X', {
                duration: 8000,
                panelClass: ['error-snackbar', 'mat-warn']
            })
        );
    }
}
