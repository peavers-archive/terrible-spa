import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Directory, History, MediaFile } from '../domain/modules';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private readonly endpoint;

  constructor(private httpClient: HttpClient) {
    this.endpoint = `${environment.api}/history`;
  }

  addToHistory(mediaFile: MediaFile): Observable<MediaFile> {
    return this.httpClient.post<MediaFile>(`${this.endpoint}`, mediaFile);
  }

  getHistory() {
    return this.httpClient.get<History>(`${this.endpoint}`);
  }
}
