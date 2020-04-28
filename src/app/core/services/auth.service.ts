import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {}

  doGoogleLogin() {
    return new Promise<any>(resolve => {
      const provider = new auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');

      this.angularFireAuth.signInWithPopup(provider).then(
        response => {
          resolve(response);
          this.router.navigate(['/']);
        },
        error => {
          console.log('Unable to communicate with Google', error);
        }
      );
    });
  }

  getUser(): Observable<User | null> {
    return this.angularFireAuth.user;
  }

  logout() {
    this.angularFireAuth.signOut().then(() => console.log('Bye!'));

    this.router.navigate(['/login']);
  }
}
