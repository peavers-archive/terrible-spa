import { Routes } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../../modules/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'video',
    loadChildren: () => import('../../modules/video/video.module').then((m) => m.VideoModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('../../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
];
