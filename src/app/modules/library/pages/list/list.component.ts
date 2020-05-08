import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaList } from '../../../../core/domain/modules';
import { MediaListService } from '../../../../core/services/media-list.service';
import Utils from '../../../../shared/utils/utils.component';

@Component({
  selector: 'app-library',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: Utils.fadeAnimation(),
})
export class ListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  mediaList: MediaList;

  favourites: MediaList;

  mediaLists: MediaList[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private mediaListService: MediaListService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.mediaListService.findFavourite().subscribe((favourites) => {
        this.favourites = favourites;
      })
    );

    this.subscriptions.push(
      this.mediaListService.findAllWithFilter('favourites').subscribe((mediaLists) => (this.mediaLists = mediaLists))
    );

    this.route.params.subscribe((response) => {
      this.subscriptions.push(
        this.mediaListService.findById(response.id).subscribe((mediaList) => (this.mediaList = mediaList))
      );
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
