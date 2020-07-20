import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountComponent} from "./components/account/account.component";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./guards/auth/auth.guard";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
