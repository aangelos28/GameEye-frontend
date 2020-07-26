import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email
    ]);
    passwordFormControl = new FormControl('', [
       Validators.required,
       Validators.minLength(8)
    ]);

    constructor(public auth: AuthService, private router: Router) {
    }

    ngOnInit(): void {
    }

    public login(): void {
        const email = this.emailFormControl.value;
        const password = this.passwordFormControl.value;
        this.auth.loginFirebase(email, password).then(cred =>
            this.router.navigate(["dashboard"])
        );
    }
}
