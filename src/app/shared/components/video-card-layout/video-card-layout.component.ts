import { Component, Input } from '@angular/core';
import { MediaFile, MediaList } from '../../../core/domain/modules';
import { Router } from '@angular/router';
import Utils from '../../utils/utils.component';

@Component({
  selector: 'app-video-card-layout',
  templateUrl: './video-card-layout.component.html',
  styleUrls: ['./video-card-layout.component.scss'],
  animations: Utils.fadeAnimation(),
})
export class VideoCardLayoutComponent {
  THUMBNAIL_POSITION = 0;

  constructor(private router: Router) {}

  @Input()
  mediaFile: MediaFile;

  @Input()
  mediaList: MediaList;

  @Input()
  mediaLists: MediaList[];

  @Input()
  favourites: MediaList;

  coverImage(mediaFile: MediaFile): string {
    return mediaFile.thumbnails == null || mediaFile.thumbnails[this.THUMBNAIL_POSITION] == null
      ? null
      : mediaFile.thumbnails[this.THUMBNAIL_POSITION];
  }

  goTo(video: MediaFile) {
    this.router.navigate([`/video/${video.id}`]);
  }
}
