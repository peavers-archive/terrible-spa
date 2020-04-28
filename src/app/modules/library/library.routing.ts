import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './pages/default/default.component';
import { ListComponent } from './pages/list/list.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DefaultComponent
      },
      {
        path: ':id',
        component: ListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule {}
