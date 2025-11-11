import { DOCUMENT, inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LogoutRedirectGuard implements CanActivate {
  private document = inject(DOCUMENT);

  canActivate(): boolean {
    this.document.location.href = 'https://portfolio-api.test/auth/logout';

    return false;
  }
}
