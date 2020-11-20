import {Component, OnInit, OnDestroy} from '@angular/core';
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
export class ArticlesComponent implements OnInit, OnDestroy {
    public gameId: string;
    public game: Game;

    private subscriptions = new Subscription();

    constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
    }

    ngOnInit(): void {
        this.subscriptions.add(this.route.params.subscribe(params => {
            this.gameId = params.gameId;
            this.httpClient.get<Game>(`/private/watchlist/game/${this.gameId}`).subscribe(game => {
                this.game = game;
                if (this.game.notificationCounts.totalNotifications > 0) {
                    this.removeAllArticleNotifications();
                }
            });
        }));
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

        this.httpClient.put('/private/user/notifications/articles/remove-all', request, {responseType: 'text'}).subscribe();
    }


    /**
     * Get the time since the date an Article was published
     */
    private getTimeSince(date: Date): string{
        let howLongAgo = ' ago';
        const today = new Date();


        let milliSince = (today.getDate() - date.getDate()) / 1000;
        const daySince = Math.floor(milliSince / 86400);
        milliSince -= daySince * 86400;


        const hourSince = Math.floor(milliSince / 3600) % 24;
        milliSince -= hourSince * 3600;


        const minSince = Math.floor(milliSince / 60) % 60;
        milliSince -= minSince * 60;


        if (daySince >= 1)
        {
            howLongAgo = daySince + ' days ' + howLongAgo;
        }
        else if (hourSince >= 1)
        {
            howLongAgo = hourSince + ' hours ' + howLongAgo;
        }
        else
        {
            howLongAgo = minSince + ' minutes ' + howLongAgo;
        }


        return howLongAgo;

    }
}
