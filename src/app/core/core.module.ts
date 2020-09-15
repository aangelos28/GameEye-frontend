import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountComponent} from './components/account/account.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TestComponent} from './components/test/test.component';
import {NavigationModule} from '../navigation/navigation.module';
import {AuthenticationModule} from '../authentication/authentication.module';

@NgModule({
    declarations: [
        AccountComponent,
        DashboardComponent,
        TestComponent
    ],
    exports: [
        AccountComponent,
        DashboardComponent,
        TestComponent
    ],
    imports: [
        CommonModule,
        NavigationModule,
        AuthenticationModule
    ]
})
export class CoreModule {}
