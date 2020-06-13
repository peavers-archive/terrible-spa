import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Directory } from '../../../core/domain/modules';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './directory-dialog.component.html',
  styleUrls: ['./directory-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DirectoryDialogComponent {
  directories: Directory[];

  constructor(
    private dialogRef: MatDialogRef<DirectoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Directory[]
  ) {
    this.directories = data;
  }

  addRow() {
    const directory: Directory = {
      id: null,
      path: ''
    };

    this.directories.push(directory);
  }

  submit() {
    this.dialogRef.close(this.directories);
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
