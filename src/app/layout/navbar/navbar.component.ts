import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {User} from 'firebase';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    user: Observable<User | null> = new Observable<User | null>();

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
}
