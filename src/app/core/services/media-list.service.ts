import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EditDialogData, FormField, MediaFile, MediaList } from '../domain/modules';
import { EditDialogComponent } from '../../modules/profile/components/edit-dialog/edit-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  findAll(): Observable<MediaList[]> {
    return this.httpClient.get<MediaList[]>(`${this.endpoint}`);
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

  public create(video: MediaFile) {
    const dialogData: EditDialogData = {
      title: 'New list',
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

    this.openDialog(dialogData)
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

  private openDialog(dialogData): MatDialogRef<EditDialogComponent> {
    return this.dialog.open(EditDialogComponent, {
      width: '35vw',
      data: dialogData,
    });
  }
}