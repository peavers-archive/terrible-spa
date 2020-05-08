import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: Utils.fadeAnimation(),
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('menuElement') menuElement: ElementRef;

  user: Observable<User> = new Observable<User>();

  mediaLists: MediaList[] = [];

  favourites: Observable<MediaList> = new Observable<MediaList>();

  searchResults: MediaFile[] = [];

  hasZeroIndex: boolean;

  elementPosition: any;

  constructor(
    private authService: AuthService,
    private selectService: SelectService,
    private mediaListService: MediaListService,
    private searchService: SearchService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  async ngOnInit() {
    this.user = this.authService.getUser();

    this.favourites = this.mediaListService.findFavourite();
  }

  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;

    this.hasZeroIndex = windowScroll > this.elementPosition;
  }

  isSelectBar() {
    return this.selectService.selectMode;
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
