import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogData, MediaFile } from '../domain/modules';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { MatDialog } from '@angular/material/dialog';
import Utils from '../../shared/utils/utils.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MediaFileService {
  private readonly endpoint: string;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.endpoint = `${environment.api}/media-files`;
  }

  findById(id: string): Observable<MediaFile> {
    return this.httpClient.get<MediaFile>(`${this.endpoint}/${id}`);
  }

  findAll(order?: string): Observable<MediaFile[]> {
    if (order === undefined) {
      order = this.storage.get('defaultOrder');
    }

    return this.httpClient.get<MediaFile[]>(`${this.endpoint}?order=${order}`);
  }

  deleteById(mediaFile: MediaFile) {
    const dialogData: DialogData = {
      title: `Delete ${mediaFile.name} from disk`,
      message: 'This is irreversible. We will destroy this media file.',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
    };

    Utils.openConfirmDialog(this.dialog, dialogData)
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.httpClient.delete<void>(`${this.endpoint}/${mediaFile.id}`).subscribe(() => {
            this.router.navigate(['/']).then(() => this.snackBar.open(`Successfully deleted ${mediaFile.name}`));
          });
        }
      });
  }

  deleteAll(): Observable<void> {
    return this.httpClient.delete<void>(`${this.endpoint}`);
  }
}
