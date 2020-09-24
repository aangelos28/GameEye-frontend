import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {AccountService} from '../../services/account/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RedirectDataService} from '../../../shared/services/redirect-data.service';
import {Subscription} from 'rxjs';
import {User} from 'firebase';
import {InfoDialogComponent} from '../../../shared/components/error-dialog/info-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CustomErrorStateMatcher} from '../login/login.component';

@Component({
    selector: 'app-change-email',
    templateUrl: './change-email.component.html',
    styleUrls: ['../login/login.component.scss']
})
export class ChangeEmailComponent implements OnInit, OnDestroy {

    public changeEmailForm: FormGroup;
    public errorMatcher: CustomErrorStateMatcher;

    private subscriptions = new Subscription();

    private readonly user: User;

    constructor(public authService: AuthService, private accountService: AccountService, private router: Router,
                private route: ActivatedRoute, private redirectData: RedirectDataService, public dialog: MatDialog) {
        this.user = this.accountService.user;
    }

    static newEmailDifferentValidation(fg: FormGroup): ValidationErrors | null {
        const currentEmail = fg.get('currentEmail').value;
        const newEmail = fg.get('newEmail').value;
        return (currentEmail !== null && newEmail !== null && currentEmail === newEmail) ? {emailSame: true} : null;
    }

    ngOnInit(): void {
        this.errorMatcher = new CustomErrorStateMatcher();

        this.changeEmailForm = new FormGroup({
            currentEmail: new FormControl({value: '', disabled: true}),
            newEmail: new FormControl('', [Validators.required, Validators.email])
        }, [ChangeEmailComponent.newEmailDifferentValidation]);

        this.currentEmailField.setValue(this.user.email);

        this.subscriptions.add(this.route.queryParams.subscribe(params => {
            if ((params.r === 'true' && this.redirectData.hasData()) || this.redirectData.isPersisted()) {
                if (this.redirectData.isPersisted()) {
                    this.redirectData.readFromLocalStorage();
                }

                if (this.redirectData.data.redirectUri === '/changeEmail') {
                    this.newEmailField.setValue(this.redirectData.data.redirectParams.email);

                    // Clear redirect parameters now that we read them
                    this.redirectData.reset();

                    this.changeEmail();
                }
            }
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    /**
     * Attempts to change the user's email to the new one they entered.
     */
    public changeEmail(): void {
        this.user.updateEmail(this.newEmailField.value).then(() => {
            this.router.navigate(['verifyEmail']);
        }).catch(err => {
            if (err.code === 'auth/requires-recent-login') {
                this.handleReauth();
            } else {
                this.dialog.open(InfoDialogComponent, {data: {text: `${err}`}});
            }
        });
    }

    /**
     * Handles re-authenticating the user with email-password or various different
     * third party providers.
     * @private
     */
    private handleReauth(): void {
        this.redirectData.reset();

        // Set redirect data
        this.redirectData.data.redirectUri = this.router.url;
        this.redirectData.data.redirectParams = {
            email: this.newEmailField.value
        };

        this.accountService.getIdTokenAsync().then(idTokenResult => {
            if (idTokenResult.signInProvider === 'password') {
                this.router.navigate(['reauth']);
            } else {
                if (idTokenResult.signInProvider === 'google.com') {
                    this.redirectData.persistToLocalStorage();
                    this.authService.reauthGoogle(this.user);
                } else if (idTokenResult.signInProvider === 'microsoft.com') {
                    this.redirectData.persistToLocalStorage();
                    this.authService.reauthMicrosoft(this.user);
                }
            }
        });
    }

    get currentEmailField(): AbstractControl {
        return this.changeEmailForm.get('currentEmail');
    }

    get newEmailField(): AbstractControl {
        return this.changeEmailForm.get('newEmail');
    }
}
