import { DOCUMENT, inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginRedirectGuard implements CanActivate {
  private authService = inject(AuthService);
  private document = inject(DOCUMENT);

  constructor() {
    this.authService.getLoginUrl().subscribe({
      next: (data: any) => {
        this.document.location.href = data.authorizationUrl;
      },
      error: (error) => {
        console.error('[LoginRedirectGuard]', error);
      },
    });
  }

  canActivate(): boolean {
    return false;
  }
}
