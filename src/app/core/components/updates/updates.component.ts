import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Game} from '../watchlist/watchlist.component';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})

export class UpdatesComponent implements OnInit {

    index: any;
    game: Observable<any>;
    aGame: Game;
    gameUrl = '/private/watchlist/game/';
    temp: any;


    constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

    private subToGame(): void
    {
        this.temp = this.route.params.subscribe(params => { this.index = params.index; });
        this.gameUrl += this.index;
        this.game = this.httpClient.get<Game>( this.gameUrl);
        this.game.subscribe((data: Game) => this.aGame = data);
    }


    ngOnInit(): void {
        this.subToGame();
     }
}
