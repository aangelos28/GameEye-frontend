import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Subscription} from 'rxjs';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {User} from 'firebase';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../../../shared/components/error-dialog/error-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {RedirectDataService} from '../../../shared/services/redirect-data.service';
import {AccountService} from '../../services/account/account.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
    // Form controls
    public userIdField: FormControl;
    public emailField: FormControl;
    public nameField: FormControl;

    // Edit mode states
    public nameInEditMode: boolean;
    public emailInEditMode: boolean;

    // Field change events
    public nameChanged: boolean;
    public emailChanged: boolean;

    // Original account data
    private _userId: string;
    private _email: string;
    private _name: string;

    private subscriptions = new Subscription();

    private user: User;

    constructor(public authService: AuthService, private accountService: AccountService, private router: Router,
                private route: ActivatedRoute, private redirectData: RedirectDataService, public dialog: MatDialog,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.userIdField = new FormControl({value: '', disabled: true});
        this.nameField = new FormControl('');
        this.emailField = new FormControl('', [Validators.email]);

        this.user = this.accountService.user;
        this._userId = this.user.uid;
        this._email = this.user.email;
        this._name = this.user.displayName;

        this.emailField.setValue(this._email);
        this.userIdField.setValue(this._userId);
        this.nameField.setValue(this._name);

        // Basic info text box change events
        this.subscriptions.add(this.nameField.valueChanges.subscribe(() => {
            this.nameChanged = (this.nameField.value !== this._name);
        }));
        this.subscriptions.add(this.emailField.valueChanges.subscribe(() => {
            this.emailChanged = (this.emailField.value !== this._email);
        }));

        // Apply redirect params, if any
        this.subscriptions.add(this.route.queryParams.subscribe(params => {
            if ((params.r === 'true' && this.redirectData.hasData()) || this.redirectData.isPersisted()) {
                if (this.redirectData.isPersisted()) {
                    this.redirectData.readFromLocalStorage();
                }

                if (this.redirectData.data.redirectUri === '/account') {
                    console.log(this.redirectData.data);
                    this.emailInEditMode = this.redirectData.data.redirectParams.emailInEditMode;
                    this.emailField.setValue(this.redirectData.data.redirectParams.email);

                    // Clear redirect parameters now that we read them
                    this.redirectData.reset();

                    this.saveEmailChanges();
                }
            }
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public toggleNameEditMode(): void {
        this.nameInEditMode = !this.nameInEditMode;

        if (!this.nameInEditMode) {
            this.nameField.setValue(this._name);
        }
    }

    public saveNameChanges(): void {
        const newName: string = this.nameField.value;

        this.user.updateProfile({displayName: newName}).then(() => {
            this._name = newName;
            this.nameField.setValue(newName);

            this.snackBar.open('Updated name', 'X', {
                duration: 5000,
                panelClass: ['success-snackbar']
            });

            this.toggleNameEditMode();
        }).catch(err => {
            this.dialog.open(ErrorDialogComponent, {data: {text: `${err}`}});
        });
    }

    public toggleEmailEditMode(): void {
        this.emailInEditMode = !this.emailInEditMode;

        if (!this.emailInEditMode) {
            this.emailField.setValue(this._email);
        }
    }

    public saveEmailChanges(): void {
        const newEmail: string = this.emailField.value;

        this.user.updateEmail(newEmail).then(() => {
            this._email = newEmail;
            this.emailField.setValue(newEmail);

            this.snackBar.open('Updated email', 'X', {
                duration: 5000,
                panelClass: ['success-snackbar']
            });

            this.toggleEmailEditMode();
        }).catch(err => {
            if (err.code === 'auth/requires-recent-login') {
                this.handleReauth();
            } else {
                this.dialog.open(ErrorDialogComponent, {data: {text: `${err}`}});
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
            emailInEditMode: this.emailInEditMode,
            email: this.emailField.value
        };

        this.user.getIdTokenResult().then(idTokenResult => {
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
}
