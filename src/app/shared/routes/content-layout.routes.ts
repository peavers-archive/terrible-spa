import { Routes } from "@angular/router";

export const CONTENT_ROUTES: Routes = [
  {
    path: "profile",
    loadChildren: () => import("../../modules/profile/profile.module").then(m => m.ProfileModule)
  }
];
