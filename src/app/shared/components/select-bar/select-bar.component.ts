import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectService } from '../../../core/services/select-service';
import { MediaListService } from '../../../core/services/media-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaFile, MediaList } from '../../../core/domain/modules';
import { MediaFileService } from '../../../core/services/media-file.service';

@Component({
  selector: 'app-select-bar',
  templateUrl: './select-bar.component.html',
  styleUrls: ['./select-bar.component.scss']
})
export class SelectBarComponent implements OnInit {
  mediaLists: Observable<MediaList[]> = new Observable<MediaList[]>();

  favourites: Observable<MediaList> = new Observable<MediaList>();

  constructor(
    private selectService: SelectService,
    private mediaListService: MediaListService,
    private mediaFileService: MediaFileService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.favourites = this.mediaListService.findFavourite();
    this.mediaLists = this.mediaListService.findAllWithFilter('favourites');
  }

  selectedLabel(): string {
    const selectedCount = this.selectService.selected.length;

    return selectedCount === 1 ? selectedCount + ' item selected' : selectedCount + ' items selected';
  }

  clear(): void {
    this.selectService.clear();
  }

  addToList(mediaList: MediaList): void {
    mediaList.mediaFiles = mediaList.mediaFiles.concat(this.selectService.selected);

    this.mediaListService
      .save(mediaList)
      .subscribe(() => {
        this.snackBar.open(`Added ${this.selectService.selected.length} videos to ${mediaList.name}`);

        this.clear();
      });
  }

  deleteSelected(): void {



    this.mediaFileService.deleteBulk(this.selectService.selected);
  }

  createMediaList(): void {
    this.mediaListService.createWithBulk(this.selectService.selected.length, this.selectService.selected);

    this.clear();
  }

  isInList(mediaList: MediaList, video: MediaFile) {
    return mediaList.mediaFiles.some((value) => value.id === video.id);
  }

  deleteById() {
  }

  recreateThumbnails() {
  }

  ignoreMediaFile() {
  }
}
