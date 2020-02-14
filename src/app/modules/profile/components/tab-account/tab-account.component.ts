import { Component, Input, OnInit } from '@angular/core';
import { User } from 'firebase';
import { EditDialogData } from '../../../../core/domain/modules';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tab-account',
  templateUrl: './tab-account.component.html',
  styleUrls: ['./tab-account.component.scss']
})
export class TabAccountComponent implements OnInit {

  @Input()
  user: User;

  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  editAbout() {
    let dialogData: EditDialogData = {
      title: 'About',
      confirmText: 'Save',
      cancelText: 'Cancel',

      formFields: [
        {
          label: 'Name',
          ngModel: '',
          value: this.user.displayName,
          placeholder: 'Name',
          isReadOnly: false
        },
        {
          label: 'Email',
          ngModel: '',
          value: this.user.email,
          placeholder: 'Email',
          isReadOnly: false
        }
      ]
    };

    this.dialog.open(EditDialogComponent, {
      width: '35vw',
      data: dialogData
    });
  }

  editAccount() {
    let dialogData: EditDialogData = {
      title: 'Account',
      confirmText: 'Save',
      cancelText: 'Close',

      formFields: [
        {
          label: 'Account Id',
          ngModel: '',
          value: this.user.uid,
          placeholder: 'Unique identifier',
          isReadOnly: true
        }
      ]
    };

    this.dialog.open(EditDialogComponent, {
      width: '35vw',
      data: dialogData
    });
  }

  editTimezone() {
    let dialogData: EditDialogData = {
      title: 'Timezone',
      confirmText: 'Save',
      cancelText: 'Cancel',

      formFields: [
        {
          label: 'Timezone',
          ngModel: '',
          value: this.timezone,
          placeholder: 'Name',
          isReadOnly: false
        }
      ]
    };

    this.dialog.open(EditDialogComponent, {
      width: '35vw',
      data: dialogData
    });
  }

}
