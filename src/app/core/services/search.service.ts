import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogData, MediaFile } from '../domain/modules';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import Utils from '../../shared/utils/utils.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly endpoint;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.endpoint = `${environment.api}/search`;
  }

  generateIndex() {
    return this.httpClient.get(`${this.endpoint}/index`);
  }

  search(query: string): Observable<MediaFile[]> {
    return this.httpClient.get<MediaFile[]>(`${this.endpoint}?query=${query}`);
  }

  deleteAll() {
    const dialogData: DialogData = {
      title: `Delete all search indexes`,
      message: 'This will force a recreation of each search index',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
    };

    Utils.openConfirmDialog(this.dialog, dialogData)
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.httpClient.delete(`${this.endpoint}`).subscribe(() => this.snackBar.open(`Deleting all search indexes`));
        }
      });
  }
}
