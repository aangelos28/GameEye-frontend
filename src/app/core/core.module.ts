import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TestComponent} from './components/test/test.component';
import {NavigationModule} from '../navigation/navigation.module';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AccountModule} from '../account/account.module';
import {SettingsComponent} from './components/settings/settings.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
    declarations: [
        DashboardComponent,
        TestComponent,
        SettingsComponent
    ],
    exports: [
        DashboardComponent,
        TestComponent
    ],
    imports: [
        CommonModule,
        NavigationModule,
        AccountModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatButtonToggleModule
    ]
})
export class CoreModule {
}
