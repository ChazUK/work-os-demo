import { DOCUMENT } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { firstValueFrom, of } from 'rxjs';
import { appRoutes } from './app.routes';
import { authInterceptor } from './http/auth.interceptor';
import { AuthService } from './services/auth.service';

const intializeAppFn = async () => {
  const authService = inject(AuthService);
  const document = inject(DOCUMENT);
  const url = new URL(document.location.href);

  if (url.pathname === '/callback') return of(null);

  try {
    const { session } = await firstValueFrom(authService.getSession());

    if (session.authenticated) await firstValueFrom(authService.getUser());
  } catch (_error) {}

  return of(null);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAppInitializer(intializeAppFn),
  ],
};
