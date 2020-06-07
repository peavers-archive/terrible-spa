import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs';

import { HistoryService } from '../../../../core/services/history.service';
import { DialogData, History, MediaFile } from '../../../../core/domain/modules';
import { Router } from '@angular/router';
import Utils from '../../../../shared/utils/utils.component';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: Utils.fadeAnimation(),
})
export class DefaultComponent implements OnInit {
  constructor(
    private historyService: HistoryService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  history: Observable<History> = new Observable<History>();

  ngOnInit() {
    this.history = this.historyService.getHistory();
  }

  goTo(mediaFile: MediaFile) {
    this.router.navigate([`/video/${mediaFile.id}`]);
  }

  convertDate(date: number): moment.Moment {
    return moment(Utils.convertToMoment(date));
  }

  deleteHistory() {
    const dialogData: DialogData = {
      title: `Delete all history`,
      message: 'This is irreversible. We will purge all history.',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
    };

    Utils.openConfirmDialog(this.dialog, dialogData)
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.historyService.deleteHistory().subscribe(() => {
            this.snackBar.open(`All history purged.`);
            this.history = new Observable<History>();
          });
        }
      });
  }
}
