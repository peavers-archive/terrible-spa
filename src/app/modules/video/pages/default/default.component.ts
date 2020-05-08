import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaFileService } from '../../../../core/services/media-file.service';
import { Observable, Subscription } from 'rxjs';
import { MediaFile, MediaList } from '../../../../core/domain/modules';
import { SearchService } from '../../../../core/services/search.service';
import { MediaListService } from '../../../../core/services/media-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HistoryService } from '../../../../core/services/history.service';
import * as moment from 'moment';
import Utils from '../../../../shared/utils/utils.component';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DefaultComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  mediaFile: MediaFile;

  mediaLists: Observable<MediaList[]> = new Observable<MediaList[]>();

  favourites: Observable<MediaList> = new Observable<MediaList>();

  constructor(
    private route: ActivatedRoute,
    private mediaFileService: MediaFileService,
    private searchService: SearchService,
    private mediaListService: MediaListService,
    private historyService: HistoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.favourites = this.mediaListService.findFavourite();
    this.mediaLists = this.mediaListService.findAllWithFilter('favourites');

    this.route.params.subscribe(response => {
      this.mediaFileService.findById(response.id).subscribe(mediaFile => {
        this.mediaFile = mediaFile;
        this.historyService.addToHistory(mediaFile).subscribe(() => console.log('Added to History'));
      });
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  createMediaList(video: MediaFile) {
    this.mediaListService.create(video);
  }

  addToList(mediaList: MediaList, video: MediaFile) {
    mediaList.mediaFiles.push(video);

    this.subscriptions.push(
      this.mediaListService
        .save(mediaList)
        .subscribe(() => this.snackBar.open(`Added ${video.name} to ${mediaList.name}`))
    );
  }

  removeFromList(mediaList: MediaList, video: MediaFile) {
    mediaList.mediaFiles = mediaList.mediaFiles.filter(file => file.id !== video.id);

    this.subscriptions.push(
      this.mediaListService
        .save(mediaList)
        .subscribe(() => this.snackBar.open(`Removed ${video.name} from ${mediaList.name}`))
    );
  }

  isInList(mediaList: MediaList, video: MediaFile) {
    return mediaList.mediaFiles.some(value => value.id === video.id);
  }

  convertDate(date: number): moment.Moment {
    return moment(Utils.convertToMoment(date));
  }
}
