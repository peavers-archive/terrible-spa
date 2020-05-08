import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { Directory, EditDialogData, FormField } from '../../../../core/domain/modules';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectoryService } from '../../../../core/services/directory.service';
import { TaskProcessorService } from '../../../../core/services/task-processor.service';
import { SearchService } from '../../../../core/services/search.service';
import { MediaFileService } from '../../../../core/services/media-file.service';
import Utils from '../../../../shared/utils/utils.component';

@Component({
  selector: 'app-profile',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultComponent implements OnInit {
  user: User;

  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  directory: Observable<Directory> = new Observable<Directory>();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private directoryService: DirectoryService,
    private taskProcessorService: TaskProcessorService,
    private searchService: SearchService,
    private mediaFileService: MediaFileService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
    });

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
          isReadOnly: false,
        },
      ],
    };

    Utils.openDialog(this.dialog, dialogData)
      .afterClosed()
      .subscribe((response: FormField[]) => {
        if (response === undefined) {
          return;
        }

        response.forEach((field) => {
          const directory: Directory = {
            path: field.value,
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
          isReadOnly: false,
        },
      ],
    };

    Utils.openDialog(this.dialog, dialogData)
      .afterClosed()
      .subscribe((response: FormField[]) => {
        if (response === undefined) {
          return;
        }

        response.forEach((field) => {
          directory.path = field.value;

          this.directoryService.save(directory).subscribe();
        });
      });
  }

  editAbout() {
    const dialogData: EditDialogData = {
      title: 'About',
      confirmText: 'Save',
      cancelText: 'Cancel',

      formFields: [
        {
          label: 'Name',
          ngModel: '',
          value: this.user.displayName,
          placeholder: 'Name',
          isReadOnly: false,
        },
        {
          label: 'Email',
          ngModel: '',
          value: this.user.email,
          placeholder: 'Email',
          isReadOnly: false,
        },
      ],
    };

    Utils.openDialog(this.dialog, dialogData)
      .afterClosed()
      .subscribe((response: FormField[]) => {
        if (response === undefined) {
          return;
        }
      });
  }

  editAccount() {
    const dialogData: EditDialogData = {
      title: 'Account',
      confirmText: 'Save',
      cancelText: 'Close',

      formFields: [
        {
          label: 'Account Id',
          ngModel: '',
          value: this.user.uid,
          placeholder: 'Unique identifier',
          isReadOnly: true,
        },
      ],
    };

    Utils.openDialog(this.dialog, dialogData)
      .afterClosed()
      .subscribe((response: FormField[]) => {
        if (response === undefined) {
          return;
        }
      });
  }

  editTimezone() {
    const dialogData: EditDialogData = {
      title: 'Timezone',
      confirmText: 'Save',
      cancelText: 'Cancel',

      formFields: [
        {
          label: 'Timezone',
          ngModel: '',
          value: this.timezone,
          placeholder: 'Name',
          isReadOnly: false,
        },
      ],
    };

    Utils.openDialog(this.dialog, dialogData)
      .afterClosed()
      .subscribe((response: FormField[]) => {
        if (response === undefined) {
          return;
        }
      });
  }

  taskScanDirectory() {
    this.directoryService.findAll().subscribe((directory) => {
      this.taskProcessorService
        .directories(directory.path)
        .subscribe(() => this.snackBar.open(`Processing ${directory.path}`));
    });
  }

  taskGenerateThumbnails() {
    this.taskProcessorService.thumbnails().subscribe(() => this.snackBar.open(`Processing thumbnail creation`));
  }

  taskGenerateSearchIndex() {
    this.searchService.generateIndex().subscribe(() => this.snackBar.open(`Generating search index`));
  }

  taskDeleteMongo() {
    this.mediaFileService.deleteAll().subscribe(() => this.snackBar.open(`Deleting all files from the database`));
  }

  taskDeleteElasticIndex() {
    this.searchService.deleteAll().subscribe(() => this.snackBar.open(`Deleting all search indexes`));
  }
}
