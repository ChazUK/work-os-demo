import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private userSubject = new BehaviorSubject<User | null>(null);
  private http = inject(HttpClient);
  public user$ = this.userSubject.asObservable();

  constructor() {}

  getLoginUrl(state?: string): Observable<{ url: string }> {
    const params = new HttpParams({ fromObject: state ? { state } : {} });

    return this.http.get<{ url: string }>(`${this.apiUrl}/login`, {
      params,
    });
  }

  handleCallback({
    code,
  }: {
    code: string;
    state?: string;
  }): Observable<{ user: User; redirectUrl: string }> {
    return this.http
      .get<{ user: User; redirectUrl: string }>(`${this.apiUrl}/callback`, {
        params: { code },
        withCredentials: true,
      })
      .pipe(
        tap(({ user }) => {
          this.userSubject.next(user);
        }),
      );
  }

  checkAuth(): Observable<boolean> {
    console.log('check auth');
    return this.http
      .get<{ user: User }>(`${this.apiUrl}/user`, { withCredentials: true })
      .pipe(
        map(({ user }) => {
          console.log({ user });
          if (user) {
            this.userSubject.next(user);

            return true;
          }

          return false;
        }),
        catchError(() => {
          return of(false);
        }),
      );
  }

  logout(): Observable<{ logoutUrl: string }> {
    return this.http
      .post<{ logoutUrl: string }>(
        `${this.apiUrl}/logout`,
        {},
        {
          withCredentials: true,
        },
      )
      .pipe(
        tap(() => {
          this.userSubject.next(null);
        }),
      );
  }

  isAuthenticated(): boolean {
    return this.userSubject.value !== null;
  }
}
