import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectService } from '../../core/services/select-service';
import { MediaListService } from '../../core/services/media-list.service';
import { MediaFile, MediaList } from '../../core/domain/modules';
import Utils from '../../shared/utils/utils.component';
import { SearchService } from '../../core/services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: Utils.fadeAnimation()
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('menuElement')
  menuElement: ElementRef;

  mediaLists: MediaList[] = [];

  favourites: Observable<MediaList> = new Observable<MediaList>();

  searchResults: MediaFile[] = [];

  hasZeroIndex: boolean;

  elementPosition: any;

  constructor(
    private selectService: SelectService,
    private mediaListService: MediaListService,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.favourites = this.mediaListService.findFavourite();
  }

  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  isSelectBar() {
    return this.selectService.selectMode;
  }

  search(query: any): void {
    this.searchService.search(query).subscribe(searchResults => (this.searchResults = searchResults));
  }

  showSearchResults(): boolean {
    return this.searchResults.length > 0;
  }

  goTo(id: string) {
    this.router.navigate([`/video/${id}`]);
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;

    this.hasZeroIndex = windowScroll > this.elementPosition;
  }

  coverImage(mediaFile: MediaFile): string {
    return mediaFile.thumbnails == null || mediaFile.thumbnails[6] == null ? null : mediaFile.thumbnails[6];
  }
}
