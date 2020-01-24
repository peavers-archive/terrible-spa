import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared";
import { DefaultComponent } from "./pages/default/default.component";
import { RoutingModule } from "./profile.routing";
import { EditDialogComponent } from "./components/edit-dialog/edit-dialog.component";

@NgModule({
  declarations: [DefaultComponent, EditDialogComponent],
  imports: [SharedModule, RoutingModule],
  exports: [],
  entryComponents: [EditDialogComponent]
})
export class ProfileModule {
}
