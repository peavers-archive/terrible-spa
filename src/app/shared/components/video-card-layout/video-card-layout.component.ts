import { Component, Input } from '@angular/core';
import { MediaFile } from '../../../core/domain/modules';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-card-layout',
  templateUrl: './video-card-layout.component.html',
  styleUrls: ['./video-card-layout.component.scss']
})
export class VideoCardLayoutComponent {
  THUMBNAIL_POSITION = 4;

  constructor(private router: Router) {
  }

  @Input()
  video: MediaFile;

  coverImage(mediaFile: MediaFile): string {
    return mediaFile.thumbnails == null || mediaFile.thumbnails[this.THUMBNAIL_POSITION] == null
      ? null
      : mediaFile.thumbnails[this.THUMBNAIL_POSITION];
  }

  goTo(video: MediaFile) {
    this.router.navigate([`/video/${video.id}`]);
  }
}
