import { Component, Input, OnInit } from '@angular/core';
import { MediaFile } from '../../../core/domain/modules';

@Component({
  selector: 'app-video-card-layout',
  templateUrl: './video-card-layout.component.html',
  styleUrls: ['./video-card-layout.component.scss']
})
export class VideoCardLayoutComponent implements OnInit {
  @Input()
  video: MediaFile;

  constructor() {}

  ngOnInit(): void {}

  coverImage(mediaFile: MediaFile): string {
    if (mediaFile.thumbnails == null || mediaFile.thumbnails[4] == null) {
      return '';
    }

    return mediaFile.thumbnails[4];
  }
}
