import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import Utils from '../../utils/utils.component';
import { AuthService } from '../../../core/services/auth.service';
import { SelectService } from '../../../core/services/select-service';
import { MediaListService } from '../../../core/services/media-list.service';
import { SearchService } from '../../../core/services/search.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { MediaFile, MediaList } from '../../../core/domain/modules';

@Component({
  selector: 'app-select-bar',
  templateUrl: './select-bar.component.html',
  styleUrls: ['./select-bar.component.scss'],
})
export class SelectBarComponent implements OnInit {
  mediaLists: Observable<MediaList[]> = new Observable<MediaList[]>();

  favourites: Observable<MediaList> = new Observable<MediaList>();

  constructor(
    private authService: AuthService,
    private selectService: SelectService,
    private mediaListService: MediaListService,
    private searchService: SearchService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.favourites = this.mediaListService.findFavourite();
    this.mediaLists = this.mediaListService.findAllWithFilter('favorite');
  }

  get selectedLabel(): string {
    const selectedCount = this.selectService.selected.length;

    return selectedCount == 1 ? selectedCount + ' item selected' : selectedCount + ' items selected';
  }

  clear() {
    this.selectService.clear();
  }

  addToList(mediaList: MediaList) {
    mediaList.mediaFiles = mediaList.mediaFiles.concat(this.selectService.selected);

    this.mediaListService
      .save(mediaList)
      .subscribe(() => this.snackBar.open(`Added ${this.selectService.selected.length} videos to ${mediaList.name}`));
  }

  deleteSelected() {
    this.snackBar.open(`Deleted ${this.selectService.selected.length} videos from storage`);
  }

  createMediaList() {
    this.selectService.selected.forEach((mediaFile) => {
      this.mediaListService.create(mediaFile);
    });
  }
}
