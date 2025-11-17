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
    const state = route.queryParamMap.get('state');

    if (!code) return this.navigateToLogin();

    return this.authService.handleCallback({ code }).pipe(
      map(() => {
        this.router.navigate(state ? [state] : ['/dashboard']);

        return false;
      }),
      catchError(() => {
        return this.navigateToLogin();
      }),
    );
  }

  private navigateToLogin(): Observable<boolean> {
    this.router.navigate(['/login']);

    return of(false);
  }
}
