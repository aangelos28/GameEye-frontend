import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {LoginComponent} from './components/login/login.component';
import {EmailVerificationComponent} from './components/email-verification/email-verification.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {RouterModule} from '@angular/router';
import {NavigationModule} from '../navigation/navigation.module';

@NgModule({
    declarations: [
        LoginComponent,
        EmailVerificationComponent,
        ResetPasswordComponent
    ],
    exports: [
        LoginComponent,
        EmailVerificationComponent,
        ResetPasswordComponent
    ],
    imports: [
        CommonModule,
        AngularFireAuthModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatTabsModule,
        RouterModule,
        NavigationModule
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
})
export class AuthenticationModule {
}
