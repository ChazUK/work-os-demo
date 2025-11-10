import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((user) => {
        if (user) {
          return true;
        }
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      })
    );
  }
}
