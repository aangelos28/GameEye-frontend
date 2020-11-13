import {Injectable} from '@angular/core';
import {AngularFireMessaging} from '@angular/fire/messaging';
import {HttpClient} from '@angular/common/http';

interface NotificationTokenRequest {
    notificationToken: string;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private angularFireMessaging: AngularFireMessaging, private httpClient: HttpClient) {
    }

    public requestNotificationPermission(): void {
        this.angularFireMessaging.requestToken.subscribe(token => {
            console.log(`Permission granted. Token: ${token}`);

            // Register token in backend
            const request: NotificationTokenRequest = {
                notificationToken: token
            };
            this.httpClient.post<NotificationTokenRequest>('/private/user/notifications/register', request).subscribe(() => {
                console.log('Token registered with backend');
            })
        }, (error => {
            console.log(error);
        }));
    }
}
