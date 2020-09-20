import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {CustomErrorStateMatcher} from '../login/login.component';
import {Subscription} from 'rxjs';
import {auth, User} from 'firebase';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../../../shared/components/error-dialog/error-dialog.component';
import {RedirectDataService} from '../../../shared/services/redirect-data.service';

@Component({
    selector: 'app-reauth',
    templateUrl: './reauth.component.html',
    styleUrls: ['../login/login.component.scss']
})
export class ReauthComponent implements OnInit {

    public reauthForm: FormGroup;
    public errorMatcher: CustomErrorStateMatcher;

    private user: User;

    private subscriptions = new Subscription();

    // Redirection parameters
    private redirectRoute: string;

    constructor(public authService: AuthService, private router: Router, private redirectData: RedirectDataService,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.errorMatcher = new CustomErrorStateMatcher();

        this.reauthForm = new FormGroup({
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8)
            ])
        });

        this.subscriptions.add(this.authService.firebaseAuth.user.subscribe(user => {
            this.user = user;
        }));

        // Get redirection parameters
        this.redirectRoute = this.redirectData.data.redirectUri;
        console.log(this.redirectRoute);
    }

    get password(): AbstractControl {
        return this.reauthForm.get('password');
    }

    public reauthEmailPassword(): void {
        const email: string = this.user.email;
        const password: string = this.password.value;

        const credential = auth.EmailAuthProvider.credential(email, password);

        this.user.reauthenticateWithCredential(credential).then(() => {
            this.router.navigate([this.redirectRoute]);
        }).catch(err => {
            this.dialog.open(ErrorDialogComponent, {data: {text: 'Failed to verify your password. Please try again.'}});
        });
    }
}
