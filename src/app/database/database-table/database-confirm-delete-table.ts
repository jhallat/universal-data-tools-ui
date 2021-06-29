import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  template: `
    <h3 mat-dialog-title>Confirm Table Deletion</h3>
    <mat-dialog-content>
      <p>Delete Table <b>{{data.table}}</b> ?</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
        <button mat-button [mat-dialog-close]="true">Yes</button>
        <button mat-button [mat-dialog-close]="false" cdkFocusInitial>No</button>
    </mat-dialog-actions>
  `
})
export class DatabaseConfirmDeleteTable {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {table: string}) {}
}
