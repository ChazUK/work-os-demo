import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { catchError, map, of, switchMap, take } from 'rxjs';
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
    return this.authService.user$.pipe(
      take(1),
      switchMap((user) => {
        if (user !== null) return of(!!user);

        return this.authService.checkAuth().pipe(map((user) => !!user));
      }),
      map((isAuthenticated) => {
        if (isAuthenticated) return true;

        this.router.navigate(['/login']);

        return false;
      }),
      catchError((error) => {
        console.log({ error });
        this.router.navigate(['/login']);

        return of(false);
      }),
    );
  }
}
