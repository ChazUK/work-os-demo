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
      })
      .pipe(
        tap(({ user }) => {
          this.userSubject.next(user);
        }),
      );
  }

  getUser(): Observable<User | null> {
    return this.http.get<{ user: User }>(`${this.apiUrl}/user`).pipe(
      map(({ user }) => {
        if (user) this.userSubject.next(user);

        return user;
      }),
      catchError(() => {
        return of(null);
      }),
    );
  }

  logout(): Observable<{ logoutUrl: string }> {
    return this.http
      .post<{ logoutUrl: string }>(`${this.apiUrl}/logout`, {})
      .pipe(
        tap(() => {
          this.clearUser();
        }),
      );
  }

  clearUser(): void {
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.userSubject.value !== null;
  }
}
