import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, BehaviorSubject  } from 'rxjs';
import { jwtDecode } from 'jwt-decode'

export interface JwtPayload {
    [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5107/api/auth'
  private roleSubject = new BehaviorSubject<string | null>(this.getUserRole());
  private loggedInSubject = new BehaviorSubject<boolean>(this.isTokenValid());
  loggedIn$ = this.loggedInSubject.asObservable();
  role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient) {}


  private isTokenValid(): boolean {
  const token = this.getToken();
  if (!token) return false;
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const exp = decoded['exp'];
    const now = Math.floor(Date.now() / 1000);
    return exp > now;
  } catch {
    return false;
  }
}

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
    .pipe(
      tap(response => {
        const token = response.accessToken;
        localStorage.setItem('jwt', token); 
        localStorage.setItem('refreshToken', response.refreshToken); 

        try {
          const decoded = jwtDecode<JwtPayload>(token);
          const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          this.roleSubject.next(role);
          this.loggedInSubject.next(true); 
        } catch {
          this.roleSubject.next(null);
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
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
  const token = this.getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const exp = decoded['exp'];
    const now = Math.floor(Date.now() / 1000); 
    return exp > now;
  } catch {
    return false;
  }
  }
  isAdmin(): boolean {
  return this.getUserRole() === 'Admin';
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('jwt');
    if(!token) return null;
    try{
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
    }
    catch{
        return null;
    }
  }

}
