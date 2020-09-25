import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface InfoDialogData {
    title: string;
    text: string;
}

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html'
})
export class InfoDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: InfoDialogData, public dialogRef: MatDialogRef<InfoDialogComponent>) {
    }

    public closeDialog(): void {
        this.dialogRef.close();
    }
}
