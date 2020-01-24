import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { DefaultComponent } from './pages/default/default.component';
import { RoutingModule } from './profile.routing';
import { MaterialModule } from "../../shared/material.module";

@NgModule({
  declarations: [DefaultComponent],
  imports: [SharedModule, RoutingModule, MaterialModule],
  exports: [],
  entryComponents: []
})
export class ProfileModule {}
