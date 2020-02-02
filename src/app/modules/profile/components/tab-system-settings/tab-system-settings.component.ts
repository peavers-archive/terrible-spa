import { Component, OnInit } from "@angular/core";
import { Directory, EditDialogData, FormField } from "../../../../core/domain/modules";
import { MatDialog } from "@angular/material/dialog";
import { DirectoryDialogComponent } from "../directory-dialog/directory-dialog.component";
import { DirectoryService } from "../../../../core/services/directory.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-tab-system-settings",
  templateUrl: "./tab-system-settings.component.html",
  styleUrls: ["./tab-system-settings.component.scss"]
})
export class TabSystemSettingsComponent implements OnInit {

  directories: Observable<Directory[]> = new Observable<Directory[]>();

  constructor(private dialog: MatDialog, private directoryService: DirectoryService) {
  }

  ngOnInit() {
    this.directories = this.directoryService.findAll();
  }

  editDirectories() {
    const formFields: FormField[] = [];

    // Populate existing directories
    this.directories.subscribe(directories => {
      directories.forEach(directory => {
        formFields.push(
          {
            label: "Absolute path",
            ngModel: directory.path,
            value: directory.path,
            placeholder: directory.path,
            isReadOnly: false
          }
        );
      });
    });

    // Load up modal data
    const dialogData: EditDialogData = {
      title: "Directories",
      confirmText: "Save",
      cancelText: "Cancel",
      formFields: formFields
    };

    const dialogRef = this.dialog.open(DirectoryDialogComponent, {
      width: "35vw",
      data: dialogData
    });

    // Handle the update
    dialogRef.afterClosed().subscribe((response: EditDialogData) => {
      if (response == undefined) {
        return;
      }

      response.formFields.forEach(field => {
        const directory: Directory = {
          path: field.ngModel
        };

        this.directoryService.save(directory).subscribe(result => console.log(result));
      });
    });
  }
}
