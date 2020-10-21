import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AccountComponent} from './account/components/account/account.component';
import {DashboardComponent} from './core/components/dashboard/dashboard.component';
import {TestComponent} from './core/components/test/test.component';
import {LoginComponent} from './account/components/login/login.component';
import {
    AngularFireAuthGuard,
    redirectLoggedInTo,
    redirectUnauthorizedTo
} from '@angular/fire/auth-guard';
import {EmailVerificationComponent} from './account/components/email-verification/email-verification.component';
import {EmailVerificationGuard} from './account/guards/email-verification.guard';
import {ResetPasswordComponent} from './account/components/reset-password/reset-password.component';
import {ReauthComponent} from './account/components/reauth/reauth.component';
import {ChangeEmailComponent} from './account/components/change-email/change-email.component';
import {WatchlistComponent} from './core/components/watchlist/watchlist.component';
import {AddgameComponent} from './core/components/addgame/addgame.component';
import {UpdatesComponent} from './core/components/updates/updates.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

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
        path: 'watchlist',
        component: WatchlistComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'addgame',
        component: AddgameComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'updates',
        component: UpdatesComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectLoggedInToDashboard}
    },
    {
        path: 'reauth',
        component: ReauthComponent,
        canActivate: [AngularFireAuthGuard, EmailVerificationGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'changeEmail',
        component: ChangeEmailComponent,
        canActivate: [AngularFireAuthGuard]
    },
    {path: '**', redirectTo: 'login'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
