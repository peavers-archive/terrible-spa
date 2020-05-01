import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { DefaultComponent } from './pages/default/default.component';
import { RoutingModule } from './history.routing';
import { MomentModule } from 'ngx-moment';
import { MatVideoModule } from 'mat-video';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';

@NgModule({
  declarations: [DefaultComponent],
  imports: [SharedModule, RoutingModule, MomentModule, MatVideoModule, VirtualScrollerModule],
  exports: [],
  entryComponents: []
})
export class HistoryModule {}
