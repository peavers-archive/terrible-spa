import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Directory } from '../domain/modules';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DirectoryService {
  private readonly endpoint;

  constructor(private httpClient: HttpClient) {
    this.endpoint = `${environment.api}/directory`;
  }

  save(directory: Directory): Observable<Directory> {
    return this.httpClient.post<Directory>(`${this.endpoint}`, directory);
  }

  findAll(): Observable<Directory> {
    return this.httpClient.get<Directory>(this.endpoint);
  }

  findById(id: string): Observable<Directory> {
    return this.httpClient.get<Directory>(`${this.endpoint}/${id}`);
  }

  deleteById(id: string): Observable<Directory> {
    return this.httpClient.delete<Directory>(`${this.endpoint}/${id}`);
  }
}
