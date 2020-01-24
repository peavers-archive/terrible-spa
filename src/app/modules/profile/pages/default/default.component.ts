import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AuthService } from "../../../../core/services/auth.service";
import { User } from "firebase";

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class DefaultComponent implements OnInit {
  user: User;

  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }
}
