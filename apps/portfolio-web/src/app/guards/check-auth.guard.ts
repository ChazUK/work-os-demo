import { inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CheckAuthGuard implements CanActivate {
  private authService = inject(AuthService);

  canActivate(): Observable<boolean> {
    return this.authService.checkAuth().pipe(map(() => true));
  }
}
