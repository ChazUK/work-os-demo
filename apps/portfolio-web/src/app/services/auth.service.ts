import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

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
  private apiUrl = 'http://portfolio-api.test/auth';
  private userSubject = new BehaviorSubject<User | null>(null);
  private http = inject(HttpClient);
  public user$ = this.userSubject.asObservable();

  constructor() {
    this.checkAuth();
  }

  getLoginUrl(state?: string): Observable<{ url: string }> {
    const params = new HttpParams({ fromObject: state ? { state } : {} });

    return this.http.get<{ url: string }>(`${this.apiUrl}/login`, { params }).pipe(tap((response) => {
      console.log({response})
    }));
  }

  handleCallback(code: string): Observable<{ user: User }> {
    return this.http
      .get<{ user: User }>(`${this.apiUrl}/callback`, {
        params: { code },
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.userSubject.next(response.user);
        })
      );
  }

  checkAuth(): void {
    this.http
      .get<User>(`${this.apiUrl}/me`, { withCredentials: true })
      .subscribe({
        next: (user) => this.userSubject.next(user),
        error: () => this.userSubject.next(null),
      });
  }

  logout(): Observable<{ url: string }> {
    return this.http
      .get<{ url: string }>(`${this.apiUrl}/logout`, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.userSubject.next(null);
        })
      );
  }

  isAuthenticated(): boolean {
    return this.userSubject.value !== null;
  }
}
