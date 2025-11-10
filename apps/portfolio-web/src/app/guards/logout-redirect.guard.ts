import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LogoutRedirectGuard implements CanActivate {

  private route = inject(Router);

  canActivate(): boolean {
    this.route.navigateByUrl('https://portfolio-api.test/auth/logout');

    return false;
  }
}
