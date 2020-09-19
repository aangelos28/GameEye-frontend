import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../authentication/services/auth/auth.service';
import {Subscription} from 'rxjs';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from 'firebase';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../error-dialog/error-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

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

    constructor(public authService: AuthService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.basicInfoForm = new FormGroup({
            userId: new FormControl({value: '', disabled: true}),
            email: new FormControl('', [Validators.email]),
            name: new FormControl('')
        });

        this.subscriptions.add(this.authService.firebaseAuth.user.subscribe(user => {
            this._userId = user.uid;
            this._email = user.email;
            this._name = user.displayName;

            this.emailField.setValue(this._email);
            this.userIdField.setValue(this._userId);
            this.nameField.setValue(this._name);

            this.user = user;
        }));

        // Basic info text box change events
        this.subscriptions.add(this.nameField.valueChanges.subscribe(() => {
            this.basicInfoChangedEvent();
        }));
        this.subscriptions.add(this.emailField.valueChanges.subscribe(() => {
            this.basicInfoChangedEvent();
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public toggleEditMode(): void {
        this.inEditMode = !this.inEditMode;

        if (!this.inEditMode) {
            this.emailField.setValue(this._email);
            this.nameField.setValue(this._name);
        }
    }

    public basicInfoSaveChanges(): void {
        // TODO implement reauthentication

        const newEmail: string = this.emailField.value;
        const newName: string = this.nameField.value;

        let emailPromise: Promise<void>;
        let namePromise: Promise<void>;

        let success = true;

        if (newEmail !== this._email) {
            emailPromise = this.user.updateEmail(newEmail).then(() => {
                this._email = newEmail;
                this.emailField.setValue(newEmail);
            }).catch(err => {
                this.dialog.open(ErrorDialogComponent, {data: {text: `${err}`}});
                success = false;
            });
        }
        if (newName !== this._name) {
            namePromise = this.user.updateProfile({displayName: newName}).then(() => {
                this._name = newName;
                this.nameField.setValue(newName);
            }).catch(err => {
                this.dialog.open(ErrorDialogComponent, {data: {text: `${err}`}});
                success = false;
            });
        }

        Promise.all([emailPromise, namePromise]).then(() => {
            if (!success) { return; }

            console.log('Resolved');
            this.toggleEditMode();
            this.snackBar.open('Updated profile information', 'X', {
                duration: 5000,
                panelClass: ['success-snackbar']
            });
        });
    }

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
            return 'Unspecified';
        }
    }

    get email(): string {
        return this._email;
    }
}
