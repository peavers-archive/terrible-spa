import { Component, OnInit } from '@angular/core';
import { Directory, EditDialogData, FormField } from '../../../../core/domain/modules';
import { MatDialog } from '@angular/material/dialog';
import { DirectoryService } from '../../../../core/services/directory.service';
import { Observable } from 'rxjs';
import { TaskProcessorService } from '../../../../core/services/task-processor.service';
import { SearchService } from '../../../../core/services/search.service';
import Utils from '../../../../shared/utils/utils.component';

@Component({
  selector: 'app-tab-system-settings',
  templateUrl: './tab-system-settings.component.html',
  styleUrls: ['./tab-system-settings.component.scss']
})
export class TabSystemSettingsComponent implements OnInit {
  directory: Observable<Directory> = new Observable<Directory>();

  constructor(
    private dialog: MatDialog,
    private directoryService: DirectoryService,
    private taskProcessorService: TaskProcessorService,
    private searchService: SearchService
  ) {}

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

    Utils.openDialog(this.dialog, dialogData)
      .afterClosed()
      .subscribe((response: FormField[]) => {
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

    Utils.openDialog(this.dialog, dialogData)
      .afterClosed()
      .subscribe((response: FormField[]) => {
        if (response === undefined) {
          return;
        }

        response.forEach(field => {
          directory.path = field.value;

          this.directoryService.save(directory).subscribe();
        });
      });
  }

  scanDirectory() {
    this.directoryService.findAll().subscribe(directory => {
      this.taskProcessorService.directories(directory.path);
    });
  }

  generateThumbnails() {
    this.taskProcessorService.thumbnails();
  }

  generateIndex() {
    this.searchService.generateIndex();
  }
}
