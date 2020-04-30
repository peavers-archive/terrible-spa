import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { DefaultComponent } from './pages/default/default.component';
import { RoutingModule } from './home.routing';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';

@NgModule({
  declarations: [DefaultComponent],
  imports: [SharedModule, RoutingModule, VirtualScrollerModule],
  exports: [],
  entryComponents: []
})
export class HomeModule {}
