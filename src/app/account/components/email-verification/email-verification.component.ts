import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AccountService} from '../../services/account/account.service';

@Component({
    selector: 'app-email-verification',
    templateUrl: './email-verification.component.html',
    styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit, AfterViewInit {

    public email: Promise<string> = this.accountService.getUserEmailAsync();

    constructor(private accountService: AccountService, private authService: AuthService, private router: Router,
                private snackBar: MatSnackBar) {
    }

    public ngOnInit(): void {
        this.email.then(verified => {
            if (verified) {
                this.router.navigate(['dashboard']);
            }
        });
    }

    public ngAfterViewInit(): void {
        this.accountService.user.sendEmailVerification();
    }

    public resendConfirmationEmail(): void {
        this.accountService.user.sendEmailVerification().then(() =>
            this.snackBar.open('Confirmation email resent. Please check your inbox.', 'X', {
                duration: 10000,
                panelClass: ['success-snackbar']
            })
        ).catch(err =>
            this.snackBar.open('Failed to resend confirmation email.\n' + err, 'X', {
                duration: 10000,
                panelClass: ['error-snackbar']
            })
        );
    }

    public navigateToLogin(): void {
        this.authService.logoutFirebase().then(() =>
            this.router.navigate(['login']).then(() =>
                window.location.reload()
            )
        );
    }
}
