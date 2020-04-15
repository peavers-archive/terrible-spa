import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from 'firebase';
import { MediaFileService } from '../../../../core/services/media-file.service';
import { Observable, Subscription } from 'rxjs';
import { MediaFile } from '../../../../core/domain/modules';
import { SearchService } from '../../../../core/services/search.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  mediaFiles: MediaFile[] = [];

  user: Observable<User> = new Observable<User>();

  constructor(
    private authService: AuthService,
    private mediaFileService: MediaFileService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();

    this.subscriptions.push(this.mediaFileService.findAll().subscribe((mediaFiles) => (this.mediaFiles = mediaFiles)));
  }

  search(query: any): void {
    let observable = query ? this.searchService.search(query) : this.mediaFileService.findAll();

    this.subscriptions.push(observable.subscribe((mediaFiles) => (this.mediaFiles = mediaFiles)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
