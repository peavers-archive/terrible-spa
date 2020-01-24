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

  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  constructor(private authService: AuthService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  editAbout() {
    let dialogData: EditDialogData = {
      title: "About",
      confirmText: "Save",
      cancelText: "Cancel",

      formFields: [
        {
          label: "Name",
          ngModel: "",
          value: this.user.displayName,
          placeholder: "Name",
          disabled: false
        },
        {
          label: "Email",
          ngModel: "",
          value: this.user.email,
          placeholder: "Email",
          disabled: false
        }
      ]
    };

    this.dialog.open(EditDialogComponent, {
      width: "35vw",
      data: dialogData
    });
  }

  editAccount() {
    let dialogData: EditDialogData = {
      title: "Account",
      confirmText: "Save",
      cancelText: "Close",

      formFields: [
        {
          label: "Account Id",
          ngModel: "",
          value: this.user.uid,
          placeholder: "Unique identifier",
          disabled: true
        }
      ]
    };

    this.dialog.open(EditDialogComponent, {
      width: "35vw",
      data: dialogData
    });
  }

  editTimezone() {
    let dialogData: EditDialogData = {
      title: "Timezone",
      confirmText: "Save",
      cancelText: "Cancel",

      formFields: [
        {
          label: "Timezone",
          ngModel: "",
          value: this.timezone,
          placeholder: "Name",
          disabled: false
        }
      ]
    };

    this.dialog.open(EditDialogComponent, {
      width: "35vw",
      data: dialogData
    });
  }
}
