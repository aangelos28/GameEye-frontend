import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountComponent} from './components/account/account.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TestComponent} from './components/test/test.component';
import {NavigationModule} from '../navigation/navigation.module';
import {AuthenticationModule} from '../authentication/authentication.module';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

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
        AuthenticationModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule
    ]
})
export class CoreModule {}
