import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaFileService } from '../../../../core/services/media-file.service';
import { Observable } from 'rxjs';
import { MediaFile, MediaList } from '../../../../core/domain/modules';
import { SearchService } from '../../../../core/services/search.service';
import { MediaListService } from '../../../../core/services/media-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultComponent implements OnInit {
  THUMBNAIL_POSITION = 4;

  mediaFile: Observable<MediaFile> = new Observable<MediaFile>();

  mediaLists: Observable<MediaList[]> = new Observable<MediaList[]>();

  favourites: Observable<MediaList> = new Observable<MediaList>();

  constructor(
    private route: ActivatedRoute,
    private mediaFileService: MediaFileService,
    private searchService: SearchService,
    private mediaListService: MediaListService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.favourites = this.mediaListService.findFavourite();
    this.mediaLists = this.mediaListService.findAllWithFilter('favourites');

    this.route.params.subscribe((response) => {
      this.mediaFile = this.mediaFileService.findById(response.id);
    });
  }

  coverImage(mediaFile: MediaFile): string {
    return mediaFile.thumbnails == null || mediaFile.thumbnails[this.THUMBNAIL_POSITION] == null
      ? null
      : mediaFile.thumbnails[this.THUMBNAIL_POSITION];
  }

  createMediaList(video: MediaFile) {
    this.mediaListService.create(video);
  }

  addToList(mediaList: MediaList, video: MediaFile) {
    mediaList.mediaFiles.push(video);

    this.mediaListService
      .save(mediaList)
      .subscribe(() => this.snackBar.open(`Added ${video.name} to ${mediaList.name}`));
  }

  removeFromList(mediaList: MediaList, video: MediaFile) {
    mediaList.mediaFiles = mediaList.mediaFiles.filter((file) => file.id !== video.id);

    this.mediaListService
      .save(mediaList)
      .subscribe(() => this.snackBar.open(`Removed ${video.name} from ${mediaList.name}`));
  }

  isInList(mediaList: MediaList, video: MediaFile) {
    return mediaList.mediaFiles.some((value) => value.id === video.id);
  }
}
