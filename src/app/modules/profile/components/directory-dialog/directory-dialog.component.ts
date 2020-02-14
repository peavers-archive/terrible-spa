import { Component, Inject, OnInit } from '@angular/core';
import { EditDialogData, FormField } from '../../../../core/domain/modules';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-directory-dialog',
  templateUrl: './directory-dialog.component.html',
  styleUrls: ['./directory-dialog.component.scss']
})
export class DirectoryDialogComponent implements OnInit {

  input: EditDialogData;

  constructor(
    private dialogRef: MatDialogRef<DirectoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: EditDialogData
  ) {
    this.input = data;
  }

  submit() {
    this.dialogRef.close(this.input);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

  addField() {
    this.input.formFields.push({
      label: 'Absolute path',
      ngModel: '',
      value: '',
      placeholder: 'Absolute path',
      isReadOnly: false
    });
  }

  deleteField(field: FormField) {
    this.input.formFields = this.input.formFields.filter(f => f != field);
  }
}
