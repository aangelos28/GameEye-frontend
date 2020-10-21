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
import {WatchlistComponent} from './components/watchlist/watchlist.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatRippleModule} from '@angular/material/core';
import {AddgameComponent} from './components/addgame/addgame.component';
import {RouterModule} from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {UpdatesComponent} from './components/updates/updates.component';

@NgModule({
    declarations: [
        DashboardComponent,
        TestComponent,
        WatchlistComponent,
        AddgameComponent,
        UpdatesComponent
    ],
    exports: [
        DashboardComponent,
        TestComponent,
        WatchlistComponent,
        AddgameComponent,
        UpdatesComponent
    ],
    imports: [
        CommonModule,
        NavigationModule,
        AccountModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSnackBarModule,
        MatCardModule,
        MatIconModule,
        MatBadgeModule,
        MatRippleModule,
        RouterModule,
        MatAutocompleteModule,
    ]
})
export class CoreModule {
}
