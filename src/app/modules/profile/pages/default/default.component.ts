import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AuthService } from "../../../../core/services/auth.service";
import { User } from "firebase";
import { MatDialog } from "@angular/material/dialog";
import { EditDialogComponent } from "../../components/edit-dialog/edit-dialog.component";
import { EditDialogData } from "../../../../core/domain/modules";

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class DefaultComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

}
