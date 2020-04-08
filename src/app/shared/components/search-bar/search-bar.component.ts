import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {MediaFile} from "../../../core/domain/modules";
import {SearchService} from "../../../core/services/search.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  searchInput = '';

  searchResults: Observable<MediaFile[]>;

  showResults: boolean;

  constructor(
    private searchService: SearchService,
    private router: Router
  ) {
  }

  onKey(event) {
    this.searchInput = event.target.value;

    this.searchResults = this.searchService.search(this.searchInput)

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
