import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EditDialogData, FormField, MediaList } from '../../../../core/domain/modules';
import { MediaListService } from '../../../../core/services/media-list.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditDialogComponent } from '../../../profile/components/edit-dialog/edit-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-library',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fade', [transition('void => *', [style({ opacity: 0 }), animate(150, style({ opacity: 1 }))])]),
  ],
})
export class ListComponent implements OnInit {
  mediaList: Observable<MediaList> = new Observable<MediaList>();

  constructor(
    private route: ActivatedRoute,
    private mediaListService: MediaListService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe((response) => {
      this.mediaList = this.mediaListService.findById(response.id);
    });
  }

  editMediaList(mediaList: MediaList) {
    const dialogData: EditDialogData = {
      title: 'Rename ' + mediaList.name,
      confirmText: 'Save',
      cancelText: 'Close',

      formFields: [
        {
          label: 'List name',
          value: mediaList.name,
          placeholder: 'List name',
          isReadOnly: false,
        },
      ],
    };

    this.openDialog(dialogData)
      .afterClosed()
      .subscribe((response: FormField[]) => {
        if (response === undefined) {
          return;
        }

        mediaList.name = response[0].value;

        this.mediaListService.save(mediaList).subscribe(() => this.snackBar.open(`Renamed to ${mediaList.name}`));
      });
  }

  private openDialog(dialogData): MatDialogRef<EditDialogComponent> {
    return this.dialog.open(EditDialogComponent, {
      width: '35vw',
      data: dialogData,
    });
  }
}
