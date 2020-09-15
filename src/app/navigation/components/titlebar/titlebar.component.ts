import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-titlebar',
    templateUrl: './titlebar.component.html',
    styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent implements OnInit {

    @Input() titletext: string;
    @Input() titleiconfacode: string;

    constructor() {
    }

    ngOnInit(): void {
    }
}
