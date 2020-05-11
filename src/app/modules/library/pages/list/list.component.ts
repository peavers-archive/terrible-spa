import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaList } from '../../../../core/domain/modules';
import { MediaListService } from '../../../../core/services/media-list.service';
import Utils from '../../../../shared/utils/utils.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-library',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: Utils.fadeAnimation()
})
export class ListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  mediaList: MediaList;

  favourites: MediaList;

  mediaLists: MediaList[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mediaListService: MediaListService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.mediaListService.findFavourite().subscribe(favourites => {
        this.favourites = favourites;
      })
    );

    this.subscriptions.push(
      this.mediaListService.findAllWithFilter('favourites').subscribe(mediaLists => (this.mediaLists = mediaLists))
    );

    this.route.params.subscribe(response => {
      this.subscriptions.push(
        this.mediaListService.findById(response.id).subscribe(mediaList => (this.mediaList = mediaList))
      );
    });
  }

  editMediaList(mediaList: MediaList) {
    this.mediaListService.editMediaList(mediaList);
  }

  deleteMediaList(mediaList: MediaList) {
    this.mediaListService.delete(mediaList).subscribe(() => {
      this.snackBar.open(`Deleted ${mediaList.name}`);

      this.router.navigate([`/library/collections`]);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
