import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth, User } from "firebase/app";

import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
  }

  doGoogleLogin() {
    return new Promise<any>(resolve => {
      const provider = new auth.GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");

      this.angularFireAuth.auth.signInWithPopup(provider).then(
        response => {
          resolve(response);
          this.router.navigate(["/"]);
        },
        error => {
          console.log("Unable to communicate with Google", error);
        }
      );
    });
  }

  public getUser(): User {
    return this.angularFireAuth.auth.currentUser;
  }

  public logout() {
    this.angularFireAuth.auth.signOut().then(() => console.log("Bye!"));

    this.router.navigate(["/login"]);
  }
}
