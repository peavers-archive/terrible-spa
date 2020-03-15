import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditDialogData } from '../../../../core/domain/modules';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditDialogComponent {

  input: EditDialogData;

  constructor(
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: EditDialogData
  ) {
    this.input = data;
  }

  submit() {
    this.dialogRef.close(this.input.formFields);
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
