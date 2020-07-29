import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
    selector: 'app-email-verification',
    templateUrl: './email-verification.component.html',
    styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

    email: Promise<string> = this.authService.getUserEmail();

    constructor(public authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    }

    public ngOnInit(): void {
        this.email.then(verified => {
            if (verified) {
                this.router.navigate(["dashboard"]);
            }
        })
    }

    public resendConfirmationEmail(): void {
        this.authService.firebase.user.subscribe(user => {
            user.sendEmailVerification().then(() =>
                this.snackBar.open("Confirmation email resent. Please check your inbox.", "X", {
                    duration: 10000,
                    panelClass: ["success-snackbar"]
                })
            ).catch(err =>
                this.snackBar.open("Failed to resend confirmation email.\n" + err, "X", {
                    duration: 10000,
                    panelClass: ["error-snackbar"]
                })
            )
        });
    }

    public navigateToLogin(): void {
        this.router.navigate(["login"]).then(() =>
            window.location.reload()
        )
    }
}
