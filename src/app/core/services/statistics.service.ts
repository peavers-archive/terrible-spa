import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private readonly endpoint;

  constructor(private httpClient: HttpClient) {
    this.endpoint = `${environment.api}/statistics`;
  }

  getTotalMediaFileCount() {
    return this.httpClient.get<number>(`${this.endpoint}/total-media-file-count`);
  }

  getTotalDirectorySize() {
    return this.httpClient.get<number>(`${this.endpoint}/total-directory-size`);
  }
}
