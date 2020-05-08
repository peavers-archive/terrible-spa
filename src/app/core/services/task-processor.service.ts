import { Injectable } from '@angular/core';
import { MediaFile } from '../domain/modules';
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

  thumbnails(): Observable<MediaFile[]> {
    return this.httpClient.get<MediaFile[]>(`${this.endpoint}/thumbnails`);
  }

  directories(path: string): Observable<MediaFile[]> {
    return this.httpClient.get<MediaFile[]>(`${this.endpoint}/directories?path=${path}`);
  }
}
