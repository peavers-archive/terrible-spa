import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaFile } from '../domain/modules';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaFileService {
  private readonly endpoint: string;

  constructor(private httpClient: HttpClient) {
    this.endpoint = `${environment.api}/media-files`;
  }

  findAll(): Observable<MediaFile[]> {
    return this.httpClient.get<MediaFile[]>(this.endpoint);
  }
}
