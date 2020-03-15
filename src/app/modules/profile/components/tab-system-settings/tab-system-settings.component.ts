import { Component, OnInit } from '@angular/core';
import { Directory, EditDialogData, FormField } from '../../../../core/domain/modules';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DirectoryService } from '../../../../core/services/directory.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab-system-settings',
  templateUrl: './tab-system-settings.component.html',
  styleUrls: ['./tab-system-settings.component.scss']
})
export class TabSystemSettingsComponent implements OnInit {

  directory: Observable<Directory> = new Observable<Directory>();

  constructor(
    private dialog: MatDialog,
    private directoryService: DirectoryService) {
  }

  ngOnInit() {
    this.directory = this.directoryService.findAll();
  }

  addDirectory() {
    const dialogData: EditDialogData = {
      title: 'Media Directory',
      confirmText: 'Save',
      cancelText: 'Cancel',

      formFields: [
        {
          label: 'Directory',
          value: '',
          placeholder: 'Directory',
          isReadOnly: false
        }
      ]
    };

    this.openDialog(dialogData).afterClosed().subscribe((response: FormField[]) => {
      if (response === undefined) {
        return;
      }

      response.forEach(field => {
        const directory: Directory = {
          path: field.value
        };

        this.directory = this.directoryService.save(directory);
      });
    });
  }

  editDirectory(directory: Directory) {
    const dialogData: EditDialogData = {
      title: 'Media Directory',
      confirmText: 'Save',
      cancelText: 'Cancel',

      formFields: [
        {
          label: 'Directory',
          value: directory.path,
          placeholder: 'Directory',
          isReadOnly: false
        }
      ]
    };

    this.openDialog(dialogData).afterClosed().subscribe((response: FormField[]) => {
      if (response === undefined) {
        return;
      }

      response.forEach(field => {
        directory.path = field.value;

        this.directoryService.save(directory).subscribe();
      });
    });
  }

  private openDialog(dialogData): MatDialogRef<EditDialogComponent> {
    return this.dialog.open(EditDialogComponent, {
      width: '35vw',
      data: dialogData
    });
  }
}
