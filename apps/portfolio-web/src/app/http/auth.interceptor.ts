import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const url = new URL(req.url);

  if (url.origin !== environment.apiUrl) return next(req);

  const authReq = req.clone({ withCredentials: true });

  return next(authReq).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        authService.clearUser();

        return throwError(() => error);
      }

      return throwError(() => error);
    }),
  );
};
