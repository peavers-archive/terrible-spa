import { Component, Input } from '@angular/core';
import { MediaFile, MediaList } from '../../../core/domain/modules';
import { Router } from '@angular/router';
import Utils from '../../utils/utils.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SelectService } from '../../../core/services/select-service';
import * as moment from 'moment';

@Component({
  selector: 'app-video-card-layout',
  templateUrl: './video-card-layout.component.html',
  styleUrls: ['./video-card-layout.component.scss'],
  animations: Utils.fadeAnimation(),
})
export class VideoCardLayoutComponent {
  THUMBNAIL_POSITION = 0;

  constructor(private router: Router, private selectService: SelectService) {}

  @Input()
  removeFromCollection: boolean = false;

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
    if (this.selectService.selectMode) {
      this.mediaFile.isSelected = this.mediaFile.isSelected
        ? this.selectService.remove(this.mediaFile)
        : this.selectService.add(this.mediaFile);
    } else {
      this.router.navigate([`/video/${video.id}`]);
    }
  }

  select(event: MatCheckboxChange) {
    this.mediaFile.isSelected = event.checked
      ? this.selectService.add(this.mediaFile)
      : this.selectService.remove(this.mediaFile);
  }

  convertDate(date: number): moment.Moment {
    return moment(Utils.convertToMoment(date));
  }
}
