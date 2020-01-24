import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../../core/services/auth.service";
import { User } from "firebase";

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class DefaultComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }
}
