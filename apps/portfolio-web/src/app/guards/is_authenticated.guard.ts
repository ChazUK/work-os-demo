import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class IsAuthenticatedGuard implements CanActivate, CanActivateChild {
  private router = inject(Router);
  private authService = inject(AuthService);

  canActivate() {
    return this.checkAuth();
  }

  canActivateChild() {
    return this.checkAuth();
  }

  private checkAuth() {
    if (this.authService.isAuthenticated()) return true;

    this.router.navigate(['/login']);

    return false;
  }
}
