import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EditDialogData, FormField, MediaFile, MediaList } from '../domain/modules';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import Utils from '../../shared/utils/utils.component';

@Injectable({
  providedIn: 'root',
})
export class MediaListService {
  private readonly endpoint: string;

  constructor(private httpClient: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.endpoint = `${environment.api}/media-lists`;
  }

  save(mediaList: MediaList): Observable<MediaList> {
    return this.httpClient.post<MediaList>(`${this.endpoint}`, mediaList);
  }

  findAllWithFilter(filter: string): Observable<MediaList[]> {
    return this.httpClient.get<MediaList[]>(`${this.endpoint}?filter=${filter}`);
  }

  findFavourite() {
    return this.httpClient.get<MediaList>(`${this.endpoint}/favourites`);
  }

  findById(id: string): Observable<MediaList> {
    return this.httpClient.get<MediaList>(`${this.endpoint}/${id}`);
  }

  create(video: MediaFile) {
    const dialogData: EditDialogData = {
      title: 'New collection',
      confirmText: 'Save',
      cancelText: 'Cancel',

      formFields: [
        {
          label: 'Name',
          value: '',
          placeholder: 'Name',
          isReadOnly: false,
        },
      ],
    };

    Utils.openDialog(this.dialog, dialogData)
      .afterClosed()
      .subscribe((response: FormField[]) => {
        if (response === undefined) {
          return;
        }

        const mediaList: MediaList = {
          name: response[0].value,
          mediaFiles: new Array(1).fill(video),
        };

        this.save(mediaList).subscribe(() => this.snackBar.open(`Added ${video.name} to ${mediaList.name}`));
      });
  }
}
