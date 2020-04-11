import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaFile } from '../domain/modules';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskProcessorService {
  private readonly endpoint: string;

  constructor(private httpClient: HttpClient) {
    this.endpoint = `${environment.api}/task`;
  }

  thumbnails(): Observable<MediaFile[]> {
    return this.httpClient.get<MediaFile[]>(`${this.endpoint}/thumbnails`);
  }

  directories(path: string) {
    return this.httpClient.get<MediaFile[]>(`${this.endpoint}/directories?path=${path}`);
  }
}
