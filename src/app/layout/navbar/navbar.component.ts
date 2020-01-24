import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { User } from "firebase";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {

  user: User;

  constructor(
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
