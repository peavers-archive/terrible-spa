import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from 'firebase';
import { MediaFileService } from '../../../../core/services/media-file.service';
import { Observable, Subscription } from 'rxjs';
import { GroupedMediaFile, MediaFile, MediaList } from '../../../../core/domain/modules';
import { SearchService } from '../../../../core/services/search.service';
import { MediaListService } from '../../../../core/services/media-list.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  mediaFiles: MediaFile[] = [];

  mediaLists: MediaList[] = [];

  favourites: MediaList;

  constructor(
    private mediaFileService: MediaFileService,
    private mediaListService: MediaListService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.mediaListService.findFavourite().subscribe((favourites) => (this.favourites = favourites))
    );

    this.subscriptions.push(
      this.mediaListService.findAllWithFilter('favourites').subscribe((mediaLists) => (this.mediaLists = mediaLists))
    );

    this.subscriptions.push(this.mediaFileService.findAll().subscribe((mediaFiles) => (this.mediaFiles = mediaFiles)));
  }

  search(query: any): void {
    let observable = query ? this.searchService.search(query) : this.mediaFileService.findAll();

    this.subscriptions.push(observable.subscribe((mediaFiles) => (this.mediaFiles = mediaFiles)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
