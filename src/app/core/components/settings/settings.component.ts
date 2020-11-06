import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../account/services/auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {catchError, delay, retryWhen, take} from 'rxjs/operators';
import {of} from 'rxjs';

export interface Settings {
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
    // Notification settings
    public settings: Settings;

    public loading = true;

    constructor(private httpClient: HttpClient) {
    }

    ngOnInit(): void {
        // Get user notifications
        this.httpClient.get<Settings>('/private/user/settings').pipe(
            retryWhen(errors => errors.pipe(delay(500), take(10)))
        ).subscribe(settings => {
            this.settings = settings;
            this.loading = false;
        });
    }

    newsArticlesCheckboxChanged(e: any): void {
        e.preventDefault();
        this.settings.receiveArticleNotifications = true;
    }
}
