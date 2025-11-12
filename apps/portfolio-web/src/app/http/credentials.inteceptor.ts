import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function credentialsInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  if (req.url.includes('portfolio-api.test')) {
    const authReq = req.clone({
      withCredentials: true,
    });

    return next(authReq);
  }

  return next(req);
}
