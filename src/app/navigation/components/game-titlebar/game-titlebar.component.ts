import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-game-titlebar',
    templateUrl: './game-titlebar.component.html',
    styleUrls: ['./game-titlebar.component.scss']
})
export class GameTitlebarComponent implements OnInit {

    @Input() titleText: string;
    @Input() subTitleText: string;
    @Input() imageUrl: string;

    constructor() {
    }

    ngOnInit(): void {
    }
}
