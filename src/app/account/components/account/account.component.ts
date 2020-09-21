import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Subscription} from 'rxjs';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
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
    public basicInfoForm: FormGroup;

    public inEditMode: boolean;
    public basicInfoChanged: boolean;

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
        this.basicInfoForm = new FormGroup({
            userId: new FormControl({value: '', disabled: true}),
            email: new FormControl('', [Validators.email]),
            name: new FormControl('')
        });

        this.user = this.accountService.user;
        this._userId = this.user.uid;
        this._email = this.user.email;
        this._name = this.user.displayName;

        this.emailField.setValue(this._email);
        this.userIdField.setValue(this._userId);
        this.nameField.setValue(this._name);

        // Basic info text box change events
        this.subscriptions.add(this.nameField.valueChanges.subscribe(() => {
            this.basicInfoChangedEvent();
        }));
        this.subscriptions.add(this.emailField.valueChanges.subscribe(() => {
            this.basicInfoChangedEvent();
        }));

        // Apply redirect params, if any
        this.subscriptions.add(this.route.queryParams.subscribe(params => {
            if ((params.r === 'true' && this.redirectData.hasData()) || this.redirectData.isPersisted()) {
                if (this.redirectData.isPersisted()) {
                    this.redirectData.readFromLocalStorage();
                }

                if (this.redirectData.data.redirectUri === '/account') {
                    console.log(this.redirectData.data);
                    this.inEditMode = this.redirectData.data.redirectParams.inEditMode;
                    this.emailField.setValue(this.redirectData.data.redirectParams.email);

                    // Clear redirect parameters now that we read them
                    this.redirectData.reset();

                    this.basicInfoSaveChanges();
                }
            }
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    /**
     * Toggles edit mode for basic information.
     */
    public toggleEditMode(): void {
        this.inEditMode = !this.inEditMode;

        if (!this.inEditMode) {
            this.emailField.setValue(this._email);
            this.nameField.setValue(this._name);
        }
    }

    /**
     * Saves changes to basic information made by the user.
     * The user is prompted to reauthenticate if they have not logged in recently.
     */
    public basicInfoSaveChanges(): void {
        const newEmail: string = this.emailField.value;
        const newName: string = this.nameField.value;

        let emailPromise: Promise<void>;
        let namePromise: Promise<void>;

        let success = true;

        // Handle email change
        if (newEmail !== this._email) {
            emailPromise = this.user.updateEmail(newEmail).then(() => {
                this._email = newEmail;
                this.emailField.setValue(newEmail);
            }).catch(err => {
                if (err.code === 'auth/requires-recent-login') {
                    this.handleReauth();
                } else {
                    this.dialog.open(ErrorDialogComponent, {data: {text: `${err}`}});
                }
                success = false;
            });
        }

        // Handle name change
        if (newName !== this._name) {
            namePromise = this.user.updateProfile({displayName: newName}).then(() => {
                this._name = newName;
                this.nameField.setValue(newName);
            }).catch(err => {
                this.dialog.open(ErrorDialogComponent, {data: {text: `${err}`}});
                success = false;
            });
        }

        // Wait for all changes to complete and then display message is successful
        Promise.all([emailPromise, namePromise]).then(() => {
            if (!success) {
                return;
            }

            this.toggleEditMode();
            this.snackBar.open('Updated profile information', 'X', {
                duration: 5000,
                panelClass: ['success-snackbar']
            });
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
            inEditMode: this.inEditMode,
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

    /**
     * Event called whenever a field in the basic information changes.
     */
    public basicInfoChangedEvent(): void {
        this.basicInfoChanged = (this.emailField.value !== this._email) || (this.nameField.value !== this._name);
    }

    get emailField(): AbstractControl {
        return this.basicInfoForm.get('email');
    }

    get nameField(): AbstractControl {
        return this.basicInfoForm.get('name');
    }

    get userIdField(): AbstractControl {
        return this.basicInfoForm.get('userId');
    }

    get userId(): string {
        return this._userId;
    }

    get name(): string {
        if (this._name) {
            return this._name;
        } else {
            return '';
        }
    }

    get email(): string {
        return this._email;
    }
}
