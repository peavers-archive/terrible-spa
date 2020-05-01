import { Routes } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../../modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'video',
    loadChildren: () => import('../../modules/video/video.module').then(m => m.VideoModule)
  },
  {
    path: 'library',
    loadChildren: () => import('../../modules/library/library.module').then(m => m.LibraryModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('../../modules/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'history',
    loadChildren: () => import('../../modules/history/history.module').then(m => m.HistoryModule)
  }
];
