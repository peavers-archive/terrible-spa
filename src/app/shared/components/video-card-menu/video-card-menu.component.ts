import { Component, Input, OnDestroy } from '@angular/core';
import { MediaFile, MediaList } from '../../../core/domain/modules';
import { MediaListService } from '../../../core/services/media-list.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-video-card-menu',
  templateUrl: './video-card-menu.component.html',
  styleUrls: ['./video-card-menu.component.scss'],
})
export class VideoCardMenuComponent implements OnDestroy {
  subscriptions: Subscription[] = [];

  @Input()
  removeFromCollection: boolean = false;

  @Input()
  mediaFile: MediaFile;

  @Input()
  mediaList: MediaList;

  @Input()
  mediaLists: MediaList[];

  @Input()
  favourites: MediaList;

  constructor(
    private mediaListService: MediaListService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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
    mediaList.mediaFiles = mediaList.mediaFiles.filter((file) => file.id !== video.id);

    this.subscriptions.push(
      this.mediaListService
        .save(mediaList)
        .subscribe(() => this.snackBar.open(`Removed ${video.name} from ${mediaList.name}`))
    );
  }

  isInList(mediaList: MediaList, video: MediaFile) {
    return mediaList.mediaFiles.some((value) => value.id === video.id);
  }
}
