import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularFireAuthModule} from "@angular/fire/auth";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTabsModule} from "@angular/material/tabs";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {LoginComponent} from "./components/login/login.component";
import {SharedModule} from "../shared/shared.module";
import {EmailVerificationComponent} from "./components/email-verification/email-verification.component";

@NgModule({
    declarations: [
        LoginComponent,
        EmailVerificationComponent
    ],
    exports: [
        LoginComponent,
        EmailVerificationComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AngularFireAuthModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatTabsModule
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
})
export class AuthenticationModule {
}
