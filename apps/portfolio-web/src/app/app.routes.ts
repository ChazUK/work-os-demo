import { Route } from '@angular/router';
import { CallbackRedirectGuard } from './guards/callback-redirect.guard';
import { IsAuthenticatedGuard } from './guards/is_authenticated.guard';
import { LoginRedirectGuard } from './guards/login-redirect.guard';
import { LogoutRedirectGuard } from './guards/logout-redirect.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/public-layout/public-layout').then(
        (m) => m.PublicLayout,
      ),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about').then((m) => m.About),
      },
      {
        path: 'login',
        canActivate: [LoginRedirectGuard],
        children: [],
      },
      {
        path: 'callback',
        canActivate: [CallbackRedirectGuard],
        children: [],
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/authenticated-layout/authenticated-layout').then(
        (m) => m.AuthenticatedLayout,
      ),
    canActivateChild: [IsAuthenticatedGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/_authenticated_/dashboard/dashboard').then(
            (m) => m.Dashboard,
          ),
      },
    ],
  },
  {
    path: 'logout',
    canActivate: [LogoutRedirectGuard],
    children: [],
  },
];
