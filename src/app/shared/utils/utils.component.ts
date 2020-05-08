import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditDialogComponent } from '../../modules/system/components/edit-dialog/edit-dialog.component';
import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';
import * as moment from 'moment';

export default class Utils {
  static openDialog(dialog: MatDialog, dialogData): MatDialogRef<EditDialogComponent> {
    return dialog.open(EditDialogComponent, {
      width: '35vw',
      data: dialogData,
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
