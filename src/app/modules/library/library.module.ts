import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { DefaultComponent } from './pages/default/default.component';
import { LibraryRoutingModule } from './library.routing';
import { MomentModule } from 'ngx-moment';
import { MatVideoModule } from 'mat-video';
import { ListComponent } from './pages/list/list.component';

@NgModule({
  declarations: [DefaultComponent, ListComponent],
  imports: [SharedModule, LibraryRoutingModule, MomentModule, MatVideoModule],
  exports: [],
  entryComponents: [],
})
export class LibraryModule {}
