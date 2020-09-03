import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MediaFile } from '../domain/modules';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private readonly endpoint;

  constructor(private httpClient: HttpClient) {
    this.endpoint = `${environment.api}/statistics`;
  }

  getTotalMediaFileCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.endpoint}/total-media-file-count`);
  }

  getTotalDirectorySize(): Observable<number> {
    return this.httpClient.get<number>(`${this.endpoint}/total-directory-size`);
  }

  getIgnoredFiles(): Observable<MediaFile[]> {
    return this.httpClient.get<MediaFile[]>(`${this.endpoint}/ignored-files`);
  }
}
