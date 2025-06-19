import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5107/api/auth';
  private roleSubject = new BehaviorSubject<string | null>(this.getUserRole());
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  private usernameSubject = new BehaviorSubject<string | null>(
    this.getUsername()
  );
  loggedIn$ = this.loggedInSubject.asObservable();
  role$ = this.roleSubject.asObservable();
  username$ = this.usernameSubject.asObservable();

  private http = inject(HttpClient);

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      username,
      password,
    });
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((response) => {
          const token = response.accessToken;
          localStorage.setItem('jwt', token);
          localStorage.setItem('refreshToken', response.refreshToken);

          const decoded = this.decodeToken();

          if (decoded) {
            const role =
              decoded[
                'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
              ];
            const name =
              decoded[
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
              ];
            this.roleSubject.next(role);
            this.usernameSubject.next(name);
            this.loggedInSubject.next(true);
          } else {
            this.roleSubject.next(null);
            this.usernameSubject.next(null);
            this.loggedInSubject.next(false);
          }
        })
      );
  }
  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    this.roleSubject.next(null);
    this.loggedInSubject.next(false);
    this.usernameSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
    return this.decodeToken() !== null;
  }
  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

  getUserRole(): string | null {
    const decoded = this.decodeToken();
    return decoded
      ? decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role'] ||
          null
      : null;
  }
  getUsername(): string | null {
    const decoded = this.decodeToken();
    return decoded
      ? decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
          null
      : null;
  }
  private decodeToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const exp = decoded['exp'];
      const now = Math.floor(Date.now() / 1000);
      if (exp <= now) return null;
      return decoded;
    } catch {
      return null;
    }
  }
}
