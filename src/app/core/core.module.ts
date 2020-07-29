import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountComponent} from "./components/account/account.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HeaderComponent} from "./components/header/header.component";
import {TestComponent} from "./components/test/test.component";
import {NavigationModule} from "../navigation/navigation.module";
import {AuthenticationModule} from "../authentication/authentication.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
        AccountComponent,
        DashboardComponent,
        HeaderComponent,
        TestComponent
    ],
    exports: [
        AccountComponent,
        DashboardComponent,
        HeaderComponent,
        TestComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        NavigationModule,
        AuthenticationModule
    ]
})
export class CoreModule {}
