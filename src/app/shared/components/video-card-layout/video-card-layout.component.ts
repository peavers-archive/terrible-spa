import { Component, Input } from '@angular/core';
import { MediaFile } from '../../../core/domain/modules';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-video-card-layout',
  templateUrl: './video-card-layout.component.html',
  styleUrls: ['./video-card-layout.component.scss'],
  animations: [
    trigger('fade', [transition('void => *', [style({ opacity: 0 }), animate(150, style({ opacity: 1 }))])]),
  ],
})
export class VideoCardLayoutComponent {
  THUMBNAIL_POSITION = 0;

  constructor(private router: Router) {}

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
