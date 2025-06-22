import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T, TDTO> {
  protected http = inject(HttpClient);
  protected abstract apiUrl: string;
  protected getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
  create(entity: TDTO): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}`, entity, {
      headers: this.getAuthHeaders(),
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
  update(id: number, entity: TDTO): Observable<void> {
      return this.http.put<void>(`${this.apiUrl}/${id}`, entity, {
        headers: this.getAuthHeaders(),
      });
    }
}
