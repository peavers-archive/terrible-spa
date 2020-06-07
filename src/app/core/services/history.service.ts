import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { History, MediaFile } from '../domain/modules';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  deleteHistory() {
    return this.httpClient.delete<void>(`${this.endpoint}`);
  }
}
