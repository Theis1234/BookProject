import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {
  protected http = inject(HttpClient);
  protected abstract apiUrl: string;
  protected getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }
  getById(id: number): Observable<T> {
      return this.http.get<T>(`${this.apiUrl}/${id}`);
    }
    delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
