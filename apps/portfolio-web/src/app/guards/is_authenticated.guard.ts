import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { catchError, map, of, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class IsAuthenticatedGuard implements CanActivate, CanActivateChild {
  private router = inject(Router);
  private authService = inject(AuthService);

  canActivate() {
    return this.checkAuth().pipe(take(1));
  }

  canActivateChild() {
    return this.checkAuth().pipe(take(1));
  }

  private checkAuth() {
    return this.authService.getSession().pipe(
      take(1),
      map(({ session }) => !!session.authenticated),
      map((isAuthenticated) => {
        console.log('[IsAuthenticatedGuard]', JSON.stringify(isAuthenticated));

        if (isAuthenticated) return true;

        this.router.navigate(['/login']);

        return false;
      }),
      catchError((error) => {
        console.error('[IsAuthenticatedGuard]', error);
        this.router.navigate(['/login']);

        return of(false);
      }),
    );
  }
}
