import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MediaFile, MediaList } from '../../../../core/domain/modules';
import { MediaListService } from '../../../../core/services/media-list.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-library',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fade', [transition('void => *', [style({ opacity: 0 }), animate(150, style({ opacity: 1 }))])]),
  ],
})
export class DefaultComponent implements OnInit {
  mediaLists: Observable<MediaList[]> = new Observable<MediaList[]>();

  favourites: Observable<MediaList> = new Observable<MediaList>();

  constructor(private router: Router, private route: ActivatedRoute, private mediaListService: MediaListService) {}

  ngOnInit() {
    this.favourites = this.mediaListService.findFavourite();
    this.mediaLists = this.mediaListService.findAllWithFilter('favourites');
  }

  coverImage(mediaFile: MediaFile): string {
    return mediaFile.thumbnails == null || mediaFile.thumbnails[4] == null ? null : mediaFile.thumbnails[4];
  }

  goTo(mediaList: MediaList) {
    this.router.navigate([`/library/${mediaList.id}`]);
  }
}
