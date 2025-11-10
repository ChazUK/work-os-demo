import { DOCUMENT, inject, Injectable } from "@angular/core";
import { CanActivate, CanActivateChild, } from "@angular/router";


@Injectable({ providedIn: 'root' })
export class IsAuthenticatedGuard implements CanActivate, CanActivateChild {
  private document = inject(DOCUMENT);

  canActivate(): boolean {
    return this.checkAuth();
  }

  canActivateChild(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    this.document.location.href = 'https://portfolio-api.test/auth/login';

    return false;
  }
}
