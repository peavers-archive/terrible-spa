import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Directory, MediaFile} from '../domain/modules';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly endpoint;

  constructor(private httpClient: HttpClient) {
    this.endpoint = `${environment.api}/search`;
  }

  generateIndex() {
    return this.httpClient.get(`${this.endpoint}/index`);
  }

  search(query: String): Observable<MediaFile[]> {
    return this.httpClient.get<MediaFile[]>(`${this.endpoint}?query=${query}`);
  }

}
