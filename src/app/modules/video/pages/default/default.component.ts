import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaFileService } from '../../../../core/services/media-file.service';
import { Observable } from 'rxjs';
import { MediaFile, MediaList } from '../../../../core/domain/modules';
import { SearchService } from '../../../../core/services/search.service';
import { MediaListService } from '../../../../core/services/media-list.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultComponent implements OnInit {
  THUMBNAIL_POSITION = 4;

  mediaFile: MediaFile;

  relatedMediaFiles: Observable<MediaFile[]> = new Observable<MediaFile[]>();

  mediaLists: Observable<MediaList[]> = new Observable<MediaList[]>();

  constructor(
    private route: ActivatedRoute,
    private mediaFileService: MediaFileService,
    private searchService: SearchService,
    private mediaListService: MediaListService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((response) => {
      this.mediaFileService.findById(response.id).subscribe((mediaFile) => {
        this.relatedMediaFiles = this.searchService.search(mediaFile.name);
        this.mediaLists = this.mediaListService.findAll();

        this.mediaFile = mediaFile;
      });
    });
  }

  coverImage(mediaFile: MediaFile): string {
    return mediaFile.thumbnails == null || mediaFile.thumbnails[this.THUMBNAIL_POSITION] == null
      ? null
      : mediaFile.thumbnails[this.THUMBNAIL_POSITION];
  }

  createPlaylist(video: MediaFile) {
    this.mediaListService.create(video);
  }

  addToList(mediaList: MediaList, video: MediaFile) {
    mediaList.mediaFiles.push(video);

    this.mediaListService.save(mediaList).subscribe();
  }
}
