import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { DefaultComponent } from './pages/default/default.component';
import { RoutingModule } from './statistics.routing';
import { MomentModule } from 'ngx-moment';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';

@NgModule({
  declarations: [DefaultComponent],
  imports: [SharedModule, RoutingModule, MomentModule, VirtualScrollerModule],
  exports: [],
  entryComponents: []
})
export class StatisticsModule {}
