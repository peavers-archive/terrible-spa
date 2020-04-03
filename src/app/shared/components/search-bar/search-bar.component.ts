import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MediaSearchHit } from '../../../core/domain/modules';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  searchInput = '';

  searchResults: Observable<MediaSearchHit[]>;

  showResults: boolean;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
  }

  onKey(event) {
    this.searchInput = event.target.value;

    this.searchResults = this.httpClient.get<MediaSearchHit[]>(
      `${environment.api}/search?query=${this.searchInput}`
    );

    this.searchResults.subscribe(videos => {
      this.showResults = videos.length >= 1;
    });
  }

  clearSearchInput() {
    this.searchInput = '';
    this.showResults = false;
  }

  goTo(id: string) {
    this.router.navigate([`/video/${id}`]);
  }
}
