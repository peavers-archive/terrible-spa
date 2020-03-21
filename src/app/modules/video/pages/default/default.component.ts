import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaFileService } from '../../../../core/services/media-file.service';
import { Observable } from 'rxjs';
import { MediaFile } from '../../../../core/domain/modules';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DefaultComponent implements OnInit {

  THUMBNAIL_POSITION = 4;

  mediaFile: Observable<MediaFile> = new Observable<MediaFile>();

  constructor(private route: ActivatedRoute, private mediaFileService: MediaFileService) {
  }

  ngOnInit() {
    this.route.params.subscribe(response => {
      this.mediaFile = this.mediaFileService.findById(response.id);
    });
  }

  coverImage(mediaFile: MediaFile): string {
    return mediaFile.thumbnails == null || mediaFile.thumbnails[this.THUMBNAIL_POSITION] == null
      ? null
      : mediaFile.thumbnails[this.THUMBNAIL_POSITION];
  }
}
