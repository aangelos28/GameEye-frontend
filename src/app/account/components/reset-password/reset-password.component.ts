import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AccountService} from '../../services/account/account.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    passwordResetForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ])
    });

    constructor(public accountService: AccountService, private snackBar: MatSnackBar) {
    }

    // tslint:disable-next-line:typedef
    get email() {
        return this.passwordResetForm.get('email');
    }

    ngOnInit(): void {
    }

    public sendPasswordResetEmail(): void {
        const email: string = this.email.value;

        this.accountService.sendPasswordResetEmailAsync(email).then(() =>
            this.snackBar.open('Password reset email sent. Please check your inbox.', 'X', {
                duration: 30000,
                panelClass: ['success-snackbar']
            })
        ).catch(err =>
            this.snackBar.open('Failed to send password reset email. ' + err, 'X', {
                duration: 10000,
                panelClass: ['error-snackbar']
            })
        );
    }
}
