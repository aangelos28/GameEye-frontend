import {Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';




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

export interface Games{
    gameId: string;
    notificationCount: number;
    resourceNotifications: ResourceNotifications;
    title: string;
    logoUrl: string;
}



@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})



export class WatchlistComponent implements OnInit {

    game: Observable<any>;
    gamelist: Array<Games>;
    empty: boolean;

    // tslint:disable-next-line:typedef
    private subToGames()
    {
        this.game = this.httpClient.get<Games[]>( '/private/watchlist');
        this.game.subscribe((data: Games[]) => this.gamelist = data);
        if (!Array.isArray(this.gamelist))
        {
            this.empty = true;
        }
        else{
           this.empty = false;
        }

    }
    constructor(private httpClient: HttpClient){
    }

    ngOnInit(): void {
        this.subToGames();
    }
}
