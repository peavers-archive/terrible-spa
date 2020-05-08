import { Routes } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../../modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'video',
    loadChildren: () => import('../../modules/video/video.module').then((m) => m.VideoModule),
  },
  {
    path: 'library',
    loadChildren: () => import('../../modules/library/library.module').then((m) => m.LibraryModule),
  },
  {
    path: 'system',
    loadChildren: () => import('../../modules/system/system.module').then((m) => m.SystemModule),
  },
  {
    path: 'history',
    loadChildren: () => import('../../modules/history/history.module').then((m) => m.HistoryModule),
  },
];
