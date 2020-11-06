import { Component, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Game} from '../watchlist/watchlist.component';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

    gameIndex: number;
    aGame: Game;

    private subscriptions = new Subscription();


    constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

    ngOnInit(): void {
    this.subscriptions.add(this.route.params.subscribe(params => {
        this.gameIndex = params.index;
        this.httpClient.get<Game>(`/private/watchlist/game/${this.gameIndex}`).subscribe(game => this.aGame = game);
    }));
    }
    // tslint:disable-next-line:use-lifecycle-interface
    ngOnDestroy(): void
    {
        this.subscriptions.unsubscribe();
    }
}
