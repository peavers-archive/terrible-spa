import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from 'firebase';
import { environment } from '../../../environments/environment';
import { MediaSearchHit } from '../../core/domain/modules';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User;

  searchInput = '';

  searchResults: Observable<MediaSearchHit[]>;

  showResults: boolean;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
  }

  async ngOnInit() {
    this.user = this.authService.getUser();
  }

  googleLogout() {
    this.authService.logout();
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
