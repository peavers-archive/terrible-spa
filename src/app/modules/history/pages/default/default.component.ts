import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs';

import { HistoryService } from '../../../../core/services/history.service';
import { History, MediaFile } from '../../../../core/domain/modules';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultComponent implements OnInit {
  constructor(private historyService: HistoryService, private router: Router) {}

  history: Observable<History> = new Observable<History>();

  ngOnInit() {
    this.history = this.historyService.findById();
  }

  goTo(mediaFile: MediaFile) {
    this.router.navigate([`/video/${mediaFile.id}`]);
  }
}
