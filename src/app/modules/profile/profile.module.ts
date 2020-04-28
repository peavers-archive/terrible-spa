import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { DefaultComponent } from './pages/default/default.component';
import { RoutingModule } from './profile.routing';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { TabAccountComponent } from './components/tab-account/tab-account.component';
import { TabSystemSettingsComponent } from './components/tab-system-settings/tab-system-settings.component';
import { DirectoryDialogComponent } from './components/directory-dialog/directory-dialog.component';
import { TabDangerZoneComponent } from './components/tab-danger-zone/tab-danger-zone.component';

@NgModule({
  declarations: [
    DefaultComponent,
    EditDialogComponent,
    TabAccountComponent,
    TabSystemSettingsComponent,
    DirectoryDialogComponent,
    TabDangerZoneComponent
  ],
  imports: [SharedModule, RoutingModule],
  exports: [],
  entryComponents: [EditDialogComponent, DirectoryDialogComponent]
})
export class ProfileModule {}
