import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../account/services/auth/auth.service';
import {NotificationService} from '../../services/notification/notification.service';

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

    public notificationsPermitted: boolean;

    constructor(private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.notificationsPermitted = Notification.permission === 'granted';
    }

    newsArticlesCheckboxChanged(e: any): void {
        e.preventDefault();
        this.newsArticleNotifications = true;
    }

    public requestNotificationPermission(): void {
        this.notificationService.requestNotificationPermission()
            .then(() => this.notificationsPermitted = Notification.permission === 'granted')
            .catch(err => this.notificationsPermitted = Notification.permission === 'granted');
    }
}
