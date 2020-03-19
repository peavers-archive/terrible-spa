import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from 'firebase';
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
  mediaFiles: Observable<MediaFile[]> = new Observable<MediaFile[]>();

  user: User;

  constructor(private authService: AuthService, private mediaFileService: MediaFileService) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.mediaFiles = this.mediaFileService.findAll();
  }

  coverImage(mediaFile: MediaFile): string {
    if (mediaFile.thumbnails == null) {
      return '';
    }

    const cover = mediaFile.thumbnails[4];

    return cover === null ? '' : cover;
  }
}
