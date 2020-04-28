import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaFile } from '../domain/modules';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly endpoint;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {
    this.endpoint = `${environment.api}/search`;
  }

  generateIndex() {
    return this.httpClient.get(`${this.endpoint}/index`).subscribe(() => this.snackBar.open(`Generating search index`));
  }

  search(query: string): Observable<MediaFile[]> {
    return this.httpClient.get<MediaFile[]>(`${this.endpoint}?query=${query}`);
  }

  deleteAll() {
    return this.httpClient.delete(`${this.endpoint}`);
  }
}
