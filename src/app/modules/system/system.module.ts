import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { DefaultComponent } from './pages/default/default.component';
import { RoutingModule } from './system.routing';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';

import { DirectoryDialogComponent } from './components/directory-dialog/directory-dialog.component';

@NgModule({
  declarations: [DefaultComponent, EditDialogComponent, DirectoryDialogComponent],
  imports: [SharedModule, RoutingModule],
  exports: [],
  entryComponents: [EditDialogComponent, DirectoryDialogComponent],
})
export class SystemModule {}
