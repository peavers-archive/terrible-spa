import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaFile } from '../domain/modules';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class MediaFileService {
  private readonly endpoint: string;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private httpClient: HttpClient) {
    this.endpoint = `${environment.api}/media-files`;
  }

  findById(id: string): Observable<MediaFile> {
    return this.httpClient.get<MediaFile>(`${this.endpoint}/${id}`);
  }

  findAll(order?: string): Observable<MediaFile[]> {
    if (order === undefined) {
      order = this.storage.get('defaultOrder');
    }

    return this.httpClient.get<MediaFile[]>(`${this.endpoint}?order=${order}`);
  }

  deleteAll(): Observable<void> {
    return this.httpClient.delete<void>(`${this.endpoint}`);
  }
}
