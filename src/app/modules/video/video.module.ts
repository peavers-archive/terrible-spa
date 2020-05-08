import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { DefaultComponent } from './pages/default/default.component';
import { RoutingModule } from './video.routing';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [DefaultComponent],
  imports: [SharedModule, RoutingModule, MomentModule],
  exports: [],
  entryComponents: [],
})
export class VideoModule {}
