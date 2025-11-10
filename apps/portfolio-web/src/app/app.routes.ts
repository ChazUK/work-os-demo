import { Route } from '@angular/router';
import { LogoutRedirectGuard } from './guards/logout-redirect.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./layouts/public-layout/public-layout').then(m => m.PublicLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about').then(m => m.About)
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    loadComponent: () => import('./layouts/authenticated-layout/authenticated-layout').then(m => m.AuthenticatedLayout),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/_authenticated_/dashboard/dashboard').then(m => m.Dashboard)
        // TODO: Add authentication guard to parent route
      }
    ]
  },
  {
    path: 'logout',
    redirectTo: '',
    pathMatch: 'full',
    canActivate: [LogoutRedirectGuard]
  }
];
