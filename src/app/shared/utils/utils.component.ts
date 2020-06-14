import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';
import * as moment from 'moment';
import { EditDialogComponent } from '../components/edit-dialog/edit-dialog.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { DirectoryDialogComponent } from '../components/directory-dialog/directory-dialog.component';
import { Directory } from '../../core/domain/modules';

export default class Utils {
  static openDirectoryDialog(dialog: MatDialog, directories: Directory[]): MatDialogRef<DirectoryDialogComponent> {
    return dialog.open(DirectoryDialogComponent, {
      width: '35vw',
      data: directories
    });
  }

  static openConfirmDialog(dialog: MatDialog, dialogData): MatDialogRef<ConfirmDialogComponent> {
    return dialog.open(ConfirmDialogComponent, {
      width: '35vw',
      data: dialogData
    });
  }

  static openEditDialog(dialog: MatDialog, dialogData): MatDialogRef<EditDialogComponent> {
    return dialog.open(EditDialogComponent, {
      width: '35vw',
      data: dialogData
    });
  }

  static fadeAnimation(): AnimationTriggerMetadata[] {
    return [trigger('fade', [transition('void => *', [style({ opacity: 0 }), animate(150, style({ opacity: 1 }))])])];
  }

  static emptyString(): string {
    return '';
  }

  static isEmpty(array: any[]): boolean {
    return !(!Array.isArray(array) || !array.length);
  }

  static convertToMoment(input): string {
    return moment(input, 'YYYY-MM-DDTHH:mm:ssZ').format();
  }
}
