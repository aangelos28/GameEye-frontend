import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, retryWhen, take} from 'rxjs/operators';
import {NotificationService} from '../../services/notification/notification.service';

export interface NotificationSettings {
    receiveNotifications: boolean;
    receiveArticleNotifications: boolean;
    notifyOnlyIfImportant: boolean;
}

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    public baseNotificationSettings: NotificationSettings;
    public notificationSettings: NotificationSettings;

    public notificationsPermitted: boolean;

    public loading = true;

    constructor(private httpClient: HttpClient, private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.notificationsPermitted = Notification.permission === 'granted';

        // Get user notifications
        this.httpClient.get<NotificationSettings>('/private/user/settings').pipe(
            retryWhen(errors => errors.pipe(delay(500), take(10)))
        ).subscribe(settings => {
            this.baseNotificationSettings = settings;
            this.notificationSettings = settings;
            this.loading = false;
        });
    }

    /**
     * Called when any setting changes. Calls the backend to update user settings.
     */
    public settingsChanged(): void {
        this.httpClient.put<NotificationSettings>('/private/user/settings/update', this.notificationSettings).subscribe(() => {
            this.baseNotificationSettings = this.notificationSettings;
        }, error => this.notificationSettings = this.baseNotificationSettings);
    }

    public requestNotificationPermission(): void {
        this.notificationService.requestNotificationPermission()
            .then(() => this.notificationsPermitted = Notification.permission === 'granted')
            .catch(err => this.notificationsPermitted = Notification.permission === 'granted');
    }
}
