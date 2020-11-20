import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Game} from '../watchlist/watchlist.component';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

interface ArticleNotificationsRequest {
    gameId: string;
}

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, AfterViewInit, OnDestroy {
    public gameId: string;
    public game: Game;

    private subscriptions = new Subscription();

    constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
    }

    ngOnInit(): void {
        this.subscriptions.add(this.route.params.subscribe(params => {
            this.gameId = params.gameId;
            this.httpClient.get<Game>(`/private/watchlist/game/${this.gameId}`).subscribe(game => this.game = game);
        }));
    }

    ngAfterViewInit(): void {
        if (this.game.notificationCounts.totalNotifications > 0) {
            this.removeAllArticleNotifications();
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    /**
     * Clear all user article notifications.
     * @private
     */
    private removeAllArticleNotifications(): void {
        const request: ArticleNotificationsRequest = {
            gameId: this.gameId
        };

        this.httpClient.put('/private/user/notifications/articles/remove-all', request).subscribe();
    }
}
