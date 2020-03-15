import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from 'firebase';
import { MediaFileService } from '../../../../core/services/media-file.service';
import { Observable } from 'rxjs';
import { MediaFile } from '../../../../core/domain/modules';
import { TaskProcessorService } from '../../../../core/services/task-processor.service';
import { DirectoryService } from '../../../../core/services/directory.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DefaultComponent implements OnInit {

  mediaFiles: Observable<MediaFile[]> = new Observable<MediaFile[]>();

  user: User;

  constructor(private authService: AuthService,
              private mediaFileService: MediaFileService,
              private taskProcessorService: TaskProcessorService,
              private directoryService: DirectoryService) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.mediaFiles = this.mediaFileService.findAll();
  }

  refreshMedia() {
    this.directoryService.findAll().subscribe(directory => {
      this.taskProcessorService.directories(directory.path).subscribe(); // Also does thumbnail generation
    });
  }
}
