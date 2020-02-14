import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Directory } from '../domain/modules';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  private readonly endpoint: string;

  private directorySubject: BehaviorSubject<Directory[]> = new BehaviorSubject<Directory[]>([]);

  private directoryStore: Directory[] = [];

  constructor(private httpClient: HttpClient) {
    this.endpoint = `${environment.api}/directory`;
  }

  save(directory: Directory): Observable<Directory> {
    return this.httpClient.post<Directory>(`${this.endpoint}`, directory);
  }

  findAll(): Observable<Directory[]> {
    this.httpClient.get<Directory[]>(this.endpoint).subscribe(directories => {
      this.directoryStore = directories;

      this.directorySubject.next(this.directoryStore);
    });

    return this.directorySubject.asObservable();
  }

  findById(id: string): Observable<Directory> {
    return this.httpClient.get<Directory>(`${this.endpoint}/${id}`);
  }

  deleteById(id: string): Observable<Directory> {
    return this.httpClient.delete<Directory>(`${this.endpoint}/${id}`);
  }
}
