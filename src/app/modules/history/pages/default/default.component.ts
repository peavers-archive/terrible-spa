import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs';

import { HistoryService } from '../../../../core/services/history.service';
import { History, MediaFile } from '../../../../core/domain/modules';
import { Router } from '@angular/router';
import Utils from '../../../../shared/utils/utils.component';
import * as moment from 'moment';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: Utils.fadeAnimation(),
})
export class DefaultComponent implements OnInit {
  constructor(private historyService: HistoryService, private router: Router) {}

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
}
