import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AccountComponent} from "./core/components/account/account.component";
import {DashboardComponent} from "./core/components/dashboard/dashboard.component";
import {TestComponent} from "./core/components/test/test.component";
import {LoginComponent} from "./authentication/components/login/login.component";
import {
    AngularFireAuthGuard,
    redirectLoggedInTo,
    redirectUnauthorizedTo
} from "@angular/fire/auth-guard";
import {EmailVerificationComponent} from "./authentication/components/email-verification/email-verification.component";
import {EmailVerificationGuard} from "./authentication/guards/email-verification.guard";
import {ResetPasswordComponent} from "./authentication/components/reset-password/reset-password.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(["dashboard"]);

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AngularFireAuthGuard, EmailVerificationGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'account',
        component: AccountComponent,
        canActivate: [AngularFireAuthGuard, EmailVerificationGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'test',
        component: TestComponent,
        canActivate: [AngularFireAuthGuard, EmailVerificationGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'verifyEmail',
        component: EmailVerificationComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'resetPassword',
        component: ResetPasswordComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectLoggedInToDashboard}
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectLoggedInToDashboard}
    },
    {path: "**", redirectTo: 'login'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
