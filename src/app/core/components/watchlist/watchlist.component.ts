import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, of, Subscription} from 'rxjs';
import {catchError, debounceTime, delay, retryWhen, take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NotificationPermissionDialogComponent} from '../../../shared/components/notification-permission-dialog/notification-permission-dialog.component';
import {MatDialog} from '@angular/material/dialog';

export interface Articles {
    count: number;
    articleIds: any[];
}

export interface Images {
    count: number;
    imageIds: any[];
}

export interface ResourceNotifications {
    articles: Articles;
    images: Images;
}

export interface Game {
    gameId: string;
    notificationCount: number;
    resourceNotifications: ResourceNotifications;
    title: string;
    logoUrl: string;
}

interface WatchlistGameRequest {
    gameId: string;
}

@Component({
    selector: 'app-watchlist',
    templateUrl: './watchlist.component.html',
    styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit, OnDestroy, AfterViewInit {
    public watchlistGames: Game[];
    public loading: boolean;
    public inDeleteMode: boolean;

    private subscriptions = new Subscription();

    private loading$: BehaviorSubject<boolean>;

    constructor(private router: Router, private httpClient: HttpClient, private dialog: MatDialog) {
        this.watchlistGames = [];
        this.loading = false;
        this.loading$ = new BehaviorSubject<boolean>(false);
        this.inDeleteMode = false;
    }

    ngOnInit(): void {
        // Loading indicator delay
        this.loading$.next(true);
        this.subscriptions.add(this.loading$.pipe(debounceTime(1000))
            .subscribe(loading => {
                if (this.loading === true) {
                    this.loading = loading;
                }
            }));

        // Watchlist endpoint subscription
        this.subscriptions.add(this.httpClient.get<Game[]>('/private/watchlist').pipe(
            retryWhen(errors => errors.pipe(delay(2000), take(10))),
            catchError(err => of([]))
        ).subscribe(watchlistGames => {
            this.watchlistGames = watchlistGames;
            this.loading = false;
        }));
    }

    ngAfterViewInit(): void {
        if (Notification.permission !== 'granted' && localStorage.getItem('notificationDialogShown') !== 'true') {
            this.dialog.open(NotificationPermissionDialogComponent);
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    /**
     * Click event handler for a watchlist entry.
     * Routes to the proper resource page or deletes an entry if delete mode is enabled.
     * @param index Watchlist game index for click
     */
    public watchlistEntryClick(index: number): void {
        if (!this.inDeleteMode) {
            this.router.navigate([`/updates/${index}`]);
        } else {
            this.removeGameFromWatchlist(index);
        }
    }

    /**
     * Removes the game with the specified index in the suggestion list from the user's watchlist.
     * @param gameIndex Index of the game in the suggestion list
     */
    private removeGameFromWatchlist(gameIndex: number): void {
        const gameToRemove: Game = this.watchlistGames[gameIndex];
        const removeGameRequest: WatchlistGameRequest = {gameId: gameToRemove.gameId};

        this.httpClient.request('DELETE', '/private/watchlist/delete', {body: removeGameRequest, responseType: 'text'})
            .pipe(retryWhen(errors => errors.pipe(delay(2000), take(10))))
            .subscribe(() => {
                this.watchlistGames = this.watchlistGames.filter(game => !(game.gameId === removeGameRequest.gameId));
            });
    }

    /**
     * Toggles watchlist game delete mode.
     */
    public toggleDeleteMode(): void {
        this.inDeleteMode = !this.inDeleteMode;
    }
}
