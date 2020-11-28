import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
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
export class TopGamesComponent implements OnInit {
    public displayedColumns: string[] = ['rank', 'title', 'watchers'];
    public mostWatchedGames: MostWatchedGame[];

    public loading = true;

    constructor(private httpClient: HttpClient) {
        this.mostWatchedGames = [];
    }

    ngOnInit(): void {
        // Query top games endpoint
        this.httpClient.post<MostWatchedGame[]>('/private/game/top', {maxResults: 50}).pipe(
            retryWhen(errors => errors.pipe(delay(2000), take(5))),
            catchError(err => of([]))
        ).subscribe(games => {
            // Only show games that have at least 1 watcher
            this.mostWatchedGames = games.filter((game) => game.watchers > 0);

            for (let i = 0; i < this.mostWatchedGames.length; ++i) {
                this.mostWatchedGames[i].rank = i + 1;
            }

            this.loading = false;
        });
    }
}
