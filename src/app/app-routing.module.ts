import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AccountComponent} from "./core/components/account/account.component";
import {DashboardComponent} from "./core/components/dashboard/dashboard.component";
import {TestComponent} from "./core/components/test/test.component";
import {LoginComponent} from "./authentication/components/login/login.component";
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(["dashboard"]);

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'account',
        component: AccountComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: 'test',
        component: TestComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
    {
        path: '**',
        component: LoginComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectLoggedInToDashboard}
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
