import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of, Subscription} from 'rxjs';
import {catchError, delay, retryWhen, take} from 'rxjs/operators';

interface MostWatchedGame {
    rank: number;
    title: string;
    watchers: number;
}

@Component({
    selector: 'app-top-games',
    templateUrl: './top-games.component.html',
    styleUrls: ['./top-games.component.scss']
})
export class TopGamesComponent implements OnInit, OnDestroy {
    public displayedColumns: string[] = ['rank', 'title', 'watchers'];
    public mostWatchedGames: MostWatchedGame[];

    private subscriptions = new Subscription();

    constructor(private httpClient: HttpClient) {
        this.mostWatchedGames = [];
    }

    ngOnInit(): void {
        this.subscriptions.add(this.httpClient.post<MostWatchedGame[]>('/private/game/top', {maxResults: 25}).pipe(
            retryWhen(errors => errors.pipe(delay(2000), take(5))),
            catchError(err => of([]))
        ).subscribe(games => {
            this.mostWatchedGames = games;

            for (let i = 0; i < games.length; ++i) {
                this.mostWatchedGames[i].rank = i + 1;
            }
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
