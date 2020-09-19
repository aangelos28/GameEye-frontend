import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface ErrorDialogData {
    text: string;
}

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html'
})
export class ErrorDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorDialogData, public dialogRef: MatDialogRef<ErrorDialogComponent>) {
    }

    public closeDialog(): void {
        this.dialogRef.close();
    }
}
