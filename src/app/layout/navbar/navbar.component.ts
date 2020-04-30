import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { SelectService } from '../../core/services/select-service';
import { MediaListService } from '../../core/services/media-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaFile, MediaList } from '../../core/domain/modules';
import Utils from '../../shared/utils/utils.component';
import { SearchService } from '../../core/services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: Utils.fadeAnimation(),
})
export class NavbarComponent implements OnInit {
  isLibrary = false;

  user: Observable<User> = new Observable<User>();

  mediaLists: MediaList[] = [];

  favourites: Observable<MediaList> = new Observable<MediaList>();

  searchResults: MediaFile[] = [];

  navLinks = [];

  constructor(
    private authService: AuthService,
    private selectService: SelectService,
    private mediaListService: MediaListService,
    private searchService: SearchService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  setLibrary() {
    this.isLibrary = this.router.url.includes('library');
  }

  async ngOnInit() {
    this.user = this.authService.getUser();

    this.favourites = this.mediaListService.findFavourite();

    // Handles browser refreshes
    this.setLibrary();

    // Handles route changes
    this.router.events.subscribe(() => {
      this.setLibrary();
    });

    this.navLinks = [
      {
        path: '/library',
        label: 'favorites',
      },
      {
        path: '/library/collections',
        label: 'my collections',
      },
    ];
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
    this.selectService.selected.forEach((mediaFile) => {
      this.mediaListService.create(mediaFile);
    });
  }

  search(query: any): void {
    this.searchService.search(query).subscribe((searchResults) => (this.searchResults = searchResults));
  }

  showSearchResults(): boolean {
    return this.searchResults.length > 0;
  }

  goTo(id: string) {
    this.router.navigate([`/video/${id}`]);
  }
}
