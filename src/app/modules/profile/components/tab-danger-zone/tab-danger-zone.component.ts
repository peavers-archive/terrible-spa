import { Component, OnInit } from '@angular/core';
import { Directory } from '../../../../core/domain/modules';
import { MatDialog } from '@angular/material/dialog';
import { DirectoryService } from '../../../../core/services/directory.service';
import { Observable } from 'rxjs';
import { TaskProcessorService } from '../../../../core/services/task-processor.service';
import { SearchService } from '../../../../core/services/search.service';
import { MediaFileService } from '../../../../core/services/media-file.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tab-danger-zone',
  templateUrl: './tab-danger-zone.component.html',
  styleUrls: ['./tab-danger-zone.component.scss'],
})
export class TabDangerZoneComponent implements OnInit {
  directory: Observable<Directory> = new Observable<Directory>();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private directoryService: DirectoryService,
    private taskProcessorService: TaskProcessorService,
    private searchService: SearchService,
    private mediaFileService: MediaFileService
  ) {}

  ngOnInit() {
    this.directory = this.directoryService.findAll();
  }

  deleteMongo() {
    this.mediaFileService.deleteAll().subscribe(() => this.snackBar.open(`Deleting all files from the database`));
  }

  deleteElasticsearch() {
    this.searchService.deleteAll().subscribe(() => this.snackBar.open(`Deleting all search indexes`));
  }
}
