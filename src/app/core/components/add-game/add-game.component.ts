import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, of, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, debounceTime, finalize, switchMap, tap} from 'rxjs/operators';

// HTTP response body from autocompletion endpoint
interface GameSuggestion {
    title: string;
    id: string;
    logoUrl: string;
    releaseDate: string;
}

// HTTP request body for various watchlist endpoints
interface WatchlistGameRequest {
    gameId: string;
}

// HTTP response body from the watchlist endpoint
interface WatchlistGame {
    title: string;
    id: string;
}

// HTTP request body for autocompletion suggestions
interface AutocompletionRequest {
    gameTitle: string;
    maxSuggestions: number;
}

@Component({
    selector: 'app-add-game',
    templateUrl: './add-game.component.html',
    styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit, OnDestroy {
    public searchField: FormControl;

    private subscriptions = new Subscription();

    /**
     * Autocompletion suggestions.
     */
    public gameSuggestions: GameSuggestion[];
    public isLoadingSuggestions: boolean;

    /**
     * User's watchlist.
     */
    public watchlistGames: WatchlistGame[];

    constructor(private httpClient: HttpClient) {
        this.gameSuggestions = [];
        this.watchlistGames = [];
    }

    ngOnInit(): void {
        this.searchField = new FormControl('');

        this.subscriptions.add(this.searchField.valueChanges.pipe(
            debounceTime(300),
            tap(() => this.isLoadingSuggestions = true),
            switchMap((value) => {
                if (value.length > 2 && value.length < 128) {
                    return this.getAutocompletions(value).pipe(
                        catchError(err => of([]))
                    );
                } else {
                    return of([]);
                }
            }),
            finalize(() => this.isLoadingSuggestions = false)
        ).subscribe((autocompletionSuggestions) => {
            this.gameSuggestions = autocompletionSuggestions;
        }));

        this.getWatchlistGames();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    /**
     * Adds the game with the specified index in the suggestion list to the user's watchlist.
     * @param gameIndex Index of the game in the suggestion list
     */
    public addGameToWatchlist(gameIndex: number): void {
        const gameSuggestion: GameSuggestion = this.gameSuggestions[gameIndex];
        const gameToAdd: WatchlistGame = {
            title: gameSuggestion.title,
            id: gameSuggestion.id
        };
        const gameToAddRequest: WatchlistGameRequest = {gameId: gameToAdd.id};

        this.httpClient.post('/private/watchlist/add', gameToAddRequest, {responseType: 'text'}).subscribe(() =>
            this.watchlistGames.push(gameToAdd)
        );
    }

    /**
     * Removes the game with the specified index in the suggestion list from the user's watchlist.
     * @param gameIndex Index of the game in the suggestion list
     */
    public removeGameFromWatchlist(gameIndex: number): void {
        const gameSuggestion: GameSuggestion = this.gameSuggestions[gameIndex];
        const removeGameRequest: WatchlistGameRequest = {gameId: gameSuggestion.id};

        this.httpClient.request('DELETE', '/private/watchlist/delete', {body: removeGameRequest, responseType: 'text'})
            .subscribe(() => {
                this.watchlistGames = this.watchlistGames.filter(game => !(game.id === removeGameRequest.gameId));
            });
    }

    /**
     * Checks if the game with the specified index in the suggestion list is in the user's watchlist.
     * @param gameIndex Index of the game in the suggestion list
     */
    public checkGameInWatchlist(gameIndex: number): boolean {
        const gameSuggestion: GameSuggestion = this.gameSuggestions[gameIndex];

        return this.watchlistGames.some(watchlistGame => watchlistGame.id === gameSuggestion.id);
    }

    /**
     * Gets the games in a user's watchlist.
     * @private
     */
    private getWatchlistGames(): void {
        this.httpClient.get<WatchlistGame[]>('/private/watchlist?brief=true').subscribe((watchlist) =>
            this.watchlistGames = watchlist
        );
    }

    /**
     * Gets game autocompletion suggestions based on the input game title.
     * @param gameTitle Title of the game to autocomplete
     * @private
     */
    private getAutocompletions(gameTitle: string): Observable<GameSuggestion[]> {
        const requestBody: AutocompletionRequest = {
            gameTitle,
            maxSuggestions: 10
        };

        return this.httpClient.post<GameSuggestion[]>('/private/game/complete', requestBody);
    }

    /**
     * Format a game title by showing the release year if it exists.
     * @param game Game suggestion object
     */
    public formatGameTitle(game: GameSuggestion): string {
        if (game.releaseDate && game.releaseDate !== '') {
            return `${game.title} (${this.getDateYear(game.releaseDate)})`;
        } else {
            return game.title;
        }
    }

    /**
     * Get the year from a date.
     *
     * @param date Date to get year from
     */
    public getDateYear(date: string): number {
        return new Date(date).getFullYear();
    }
}
