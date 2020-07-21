import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountComponent} from "./components/account/account.component";
import {AuthGuard} from "./guards/auth/auth.guard";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {TestComponent} from "./components/test/test.component";

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard]  },
    { path: 'test', component: TestComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
