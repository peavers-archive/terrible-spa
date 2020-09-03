import { Injectable } from '@angular/core';
import { MediaFile, MediaList } from '../domain/modules';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskProcessorService {
  private readonly endpoint: string;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {
    this.endpoint = `${environment.api}/task`;
  }

  recreateThumbnails(mediaFile: MediaFile) {
    return this.httpClient
      .get<MediaList>(`${this.endpoint}/recreate-thumbnails/${mediaFile.id}`)
      .subscribe(() => this.snackBar.open(`Queued to recreate thumbnails for ${mediaFile.name}`));
  }

  recreateThumbnailsBulk(mediaFiles: MediaFile[]) {
    mediaFiles.forEach((mediaFile) => {
      this.httpClient.get<MediaList>(`${this.endpoint}/recreate-thumbnails/${mediaFile.id}`).subscribe();

      this.snackBar.open(`Queued to recreate thumbnails for ${mediaFiles.length} media files`);
    });
  }

  thumbnails(): Observable<MediaFile[]> {
    return this.httpClient.get<MediaFile[]>(`${this.endpoint}/thumbnails`);
  }

  directories(path: string): Observable<MediaFile[]> {
    return this.httpClient.get<MediaFile[]>(`${this.endpoint}/directories?path=${path}`);
  }
}
