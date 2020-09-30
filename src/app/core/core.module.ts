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
import { WatchlistComponent } from './components/watchlist/watchlist.component';

@NgModule({
    declarations: [
        DashboardComponent,
        TestComponent,
        WatchlistComponent
    ],
    exports: [
        DashboardComponent,
        TestComponent,
        WatchlistComponent
    ],
    imports: [
        CommonModule,
        NavigationModule,
        AccountModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSnackBarModule
    ]
})
export class CoreModule {
}
