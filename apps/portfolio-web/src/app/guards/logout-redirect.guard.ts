import { DOCUMENT, inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class LogoutRedirectGuard implements CanActivate {
  private router = inject(Router);
  private document = inject(DOCUMENT);
  private authService = inject(AuthService);

  canActivate(): Observable<boolean> {
    return this.authService.logout().pipe(
      map(({ logoutUrl }) => {
        if (logoutUrl) this.document.location.href = logoutUrl;

        this.router.navigate(['/dashboard']);

        return false;
      }),
      catchError((error) => {
        console.error(error);

        this.router.navigate(['/dashboard']);

        return of(false);
      }),
    );
  }
}
