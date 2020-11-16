import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../../core/services/notification/notification.service';

@Component({
    selector: 'app-notification-permission-dialog',
    templateUrl: './notification-permission-dialog.component.html'
})
export class NotificationPermissionDialogComponent implements OnInit {

    constructor(private notificationService: NotificationService, public dialogRef: MatDialogRef<NotificationPermissionDialogComponent>) {
    }

    ngOnInit(): void {
    }

    public no(): void {
        localStorage.setItem('notificationDialogShown', 'true');
        this.dialogRef.close();
    }

    public yes(): void {
        this.notificationService.requestNotificationPermission();
        this.dialogRef.close();
    }
}
