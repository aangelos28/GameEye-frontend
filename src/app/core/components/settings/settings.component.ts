import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../account/services/auth/auth.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    // Notification settings
    public receiveNotifications = true;
    public newsArticleNotifications = true;
    public redditPostNotifications = false;
    public imageNotifications = false;
    public youtubeNotifications = false;
    public notifyOnlyIfImportant = false;

    constructor(public auth: AuthService) {
    }

    ngOnInit(): void {
    }

    newsArticlesCheckboxChanged(e: any): void {
        e.preventDefault();
        this.newsArticleNotifications = true;
    }
}
