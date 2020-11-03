import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Game} from '../watchlist/watchlist.component';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

    index: any;
    game: Observable<any>;
    aGame: Game;
    gameUrl = '/private/watchlist/game/';
    temp: any;

    subToGame(): void
    {
        this.temp = this.route.params.subscribe(params => { this.index = params.index; });
        this.gameUrl += this.index;
        this.game = this.httpClient.get<Game>( this.gameUrl);
        this.game.subscribe((data: Game) => this.aGame = data);
    }



    constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

ngOnInit(): void {
        this.subToGame();
  }

}