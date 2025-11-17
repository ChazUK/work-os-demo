import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class CallbackRedirectGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {
    const code = route.queryParamMap.get('code');
    const stateParam = route.queryParamMap.get('state');

    console.log(
      '[CallbackRedirectGuard]',
      JSON.stringify({ code, state: stateParam }),
    );

    if (!code) {
      this.router.navigate(['/login']);

      return false;
    }

    return this.authService.handleCallback({ code }).pipe(
      map((data) => {
        console.log(
          '[CallbackRedirectGuard] handle callback',
          JSON.stringify(data),
        );

        this.router.navigate(['/dashboard']);

        return false;
      }),
      catchError((error) => {
        console.error('[CallbackRedirectGuard]', error);

        this.router.navigate(['/login']);

        return of(false);
      }),
    );
  }
}
