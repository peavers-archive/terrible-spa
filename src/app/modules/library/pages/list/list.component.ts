import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditDialogData, FormField, MediaList } from '../../../../core/domain/modules';
import { MediaListService } from '../../../../core/services/media-list.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Utils from '../../../../shared/utils/utils.component';

@Component({
  selector: 'app-library',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: Utils.fadeAnimation(),
})
export class ListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  mediaLists: MediaList[] = [];

  favourites: MediaList;

  mediaList: MediaList;

  constructor(
    private route: ActivatedRoute,
    private mediaListService: MediaListService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.mediaListService.findFavourite().subscribe((favourites) => {
        this.favourites = favourites;
      })
    );

    this.subscriptions.push(
      this.mediaListService.findAllWithFilter('favourites').subscribe((mediaLists) => (this.mediaLists = mediaLists))
    );

    this.route.params.subscribe((response) => {
      this.subscriptions.push(
        this.mediaListService.findById(response.id).subscribe((mediaList) => (this.mediaList = mediaList))
      );
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

    Utils.openDialog(this.dialog, dialogData)
      .afterClosed()
      .subscribe((response: FormField[]) => {
        if (response === undefined) {
          return;
        }

        mediaList.name = response[0].value;

        this.mediaListService.save(mediaList).subscribe(() => this.snackBar.open(`Renamed to ${mediaList.name}`));
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
