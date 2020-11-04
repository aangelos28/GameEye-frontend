import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestComponent} from './components/test/test.component';
import {NavigationModule} from '../navigation/navigation.module';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AccountModule} from '../account/account.module';
import {WatchlistComponent} from './components/watchlist/watchlist.component';
import {SettingsComponent} from './components/settings/settings.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatRippleModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {RouterModule} from '@angular/router';
import {UpdatesComponent} from './components/updates/updates.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {ArticlesComponent} from './components/articles/articles.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {TopGamesComponent} from './components/top-games/top-games.component';


@NgModule({
    declarations: [
        TestComponent,
        WatchlistComponent,
        SettingsComponent,
        UpdatesComponent,
        ArticlesComponent,
        SpinnerComponent,
        TopGamesComponent
    ],
    exports: [
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
        MatSnackBarModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatCardModule,
        MatIconModule,
        MatBadgeModule,
        MatRippleModule,
        MatSlideToggleModule,
        RouterModule,
        MatGridListModule,
        FormsModule
    ]
})
export class CoreModule {
}
