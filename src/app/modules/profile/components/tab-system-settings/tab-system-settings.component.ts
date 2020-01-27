import { Component, OnInit } from "@angular/core";
import { EditDialogData } from "../../../../core/domain/modules";
import { MatDialog } from "@angular/material/dialog";
import { DirectoryDialogComponent } from "../directory-dialog/directory-dialog.component";

@Component({
  selector: "app-tab-system-settings",
  templateUrl: "./tab-system-settings.component.html",
  styleUrls: ["./tab-system-settings.component.scss"]
})
export class TabSystemSettingsComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }


  ngOnInit() {
  }

  editDirectories() {
    let dialogData: EditDialogData = {
      title: "Directories",
      confirmText: "Save",
      cancelText: "Cancel",

      formFields: [
        {
          label: "Absolute path",
          ngModel: "",
          value: "",
          placeholder: "Absolute path",
          isReadOnly: false
        }
      ]
    };

    this.dialog.open(DirectoryDialogComponent, {
      width: "35vw",
      data: dialogData
    });
  }

}
