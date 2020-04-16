import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaFile, MediaList } from '../../../../core/domain/modules';
import { MediaListService } from '../../../../core/services/media-list.service';
import Utils from '../../../../shared/utils/utils.component';

@Component({
  selector: 'app-library',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: Utils.fadeAnimation(),
})
export class DefaultComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  mediaLists: MediaList[] = [];

  favourites: MediaList;

  constructor(private router: Router, private route: ActivatedRoute, private mediaListService: MediaListService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.mediaListService.findFavourite().subscribe((favourites) => {
        this.favourites = favourites;
      })
    );

    this.subscriptions.push(
      this.mediaListService.findAllWithFilter('favourites').subscribe((mediaLists) => (this.mediaLists = mediaLists))
    );
  }

  coverImage(mediaFile: MediaFile): string {
    return mediaFile.thumbnails == null || mediaFile.thumbnails[4] == null ? null : mediaFile.thumbnails[4];
  }

  goTo(mediaList: MediaList) {
    this.router.navigate([`/library/${mediaList.id}`]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
