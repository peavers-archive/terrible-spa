import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: Observable<User | null> = new Observable<User | null>();

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.user = this.authService.getUser();
  }

  googleLogout() {
    this.authService.logout();
  }
}
