import {Injectable} from '@angular/core';
import {AngularFireMessaging} from '@angular/fire/messaging';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private angularFireMessaging: AngularFireMessaging) {
    }

    public requestNotificationPermission(): void {
        this.angularFireMessaging.requestToken.subscribe(token => {
            console.log(`Permission granted. Token: ${token}`);
            // TODO call backend
        }, (error => {
            console.log(error);
        }));
    }
}
