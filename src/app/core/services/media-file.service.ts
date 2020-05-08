import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupedMediaFile, MediaFile } from '../domain/modules';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MediaFileService {
  private readonly endpoint: string;

  constructor(private httpClient: HttpClient) {
    this.endpoint = `${environment.api}/media-files`;
  }

  findById(id: string): Observable<MediaFile> {
    return this.httpClient.get<MediaFile>(`${this.endpoint}/${id}`);
  }

  findAll(): Observable<MediaFile[]> {
    return this.httpClient.get<MediaFile[]>(`${this.endpoint}`);
  }

  deleteAll(): Observable<Object> {
    return this.httpClient.delete(`${this.endpoint}`);
  }

  findAllGroupedByDate(group: string): Observable<GroupedMediaFile[]> {
    return this.httpClient.get<GroupedMediaFile[]>(`${environment.api}/group/media-files?group=${group}`);
  }
}
