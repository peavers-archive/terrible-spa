import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultComponent implements OnInit {
  user: Observable<User | null> = new Observable<User | null>();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getUser();
  }
}
