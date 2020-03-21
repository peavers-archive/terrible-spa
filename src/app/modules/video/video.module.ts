import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { DefaultComponent } from './pages/default/default.component';
import { RoutingModule } from './video.routing';
import { MomentModule } from 'ngx-moment';
import { MatVideoModule } from 'mat-video';

@NgModule({
  declarations: [DefaultComponent],
  imports: [SharedModule, RoutingModule, MomentModule, MatVideoModule],
  exports: [],
  entryComponents: []
})
export class VideoModule {
}
