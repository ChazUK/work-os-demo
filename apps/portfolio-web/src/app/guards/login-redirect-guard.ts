import { DOCUMENT, inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginRedirectGuard implements CanActivate {
  private document = inject(DOCUMENT);

  canActivate(): boolean {
    this.document.location.href = 'http://portfolio-api.test/auth/login';

    return false;
  }
}
