import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { SelectService } from '../../core/services/select-service';
import { MediaListService } from '../../core/services/media-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaList } from '../../core/domain/modules';
import Utils from '../../shared/utils/utils.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: Utils.fadeAnimation()
})
export class NavbarComponent implements OnInit {
  user: Observable<User> = new Observable<User>();

  mediaLists: Observable<MediaList[]> = new Observable<MediaList[]>();

  favourites: Observable<MediaList> = new Observable<MediaList>();

  constructor(
    private authService: AuthService,
    private selectService: SelectService,
    private mediaListService: MediaListService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.user = this.authService.getUser();
    this.mediaLists = this.mediaListService.findAllWithFilter('favourites');
    this.favourites = this.mediaListService.findFavourite();
  }

  get selectedLabel(): string {
    const selectedCount = this.selectService.selected.length;

    return selectedCount == 1 ? selectedCount + ' item selected' : selectedCount + ' items selected';
  }

  isSelectBar() {
    return this.selectService.selectMode;
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
    this.selectService.selected.forEach(mediaFile => {
      this.mediaListService.create(mediaFile);
    });
  }
}
