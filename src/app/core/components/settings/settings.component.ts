import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../account/services/auth/auth.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    newsArticlesNotifications = true;
    constructor(public auth: AuthService) { }

    ngOnInit(): void {
    }

    newsArticlesCheckboxChanged(event: any): void
    {
        event.preventDefault();
        this.newsArticlesNotifications = true;
    }

}
