import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaFile, MediaList } from '../../../../core/domain/modules';
import { MediaListService } from '../../../../core/services/media-list.service';
import Utils from '../../../../shared/utils/utils.component';

@Component({
  selector: 'app-library-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: Utils.fadeAnimation(),
})
export class CollectionComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  mediaLists: MediaList[] = [];

  favourites: MediaList;

  constructor(private router: Router, private mediaListService: MediaListService) {}

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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  coverImage(mediaFile: MediaFile): string {
    return null;
  }

  goTo(mediaList: MediaList): void {
    this.router.navigate([`/library/collections/${mediaList.id}`]);
  }
}
