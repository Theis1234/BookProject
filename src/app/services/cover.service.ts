import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { Cover } from '../models/cover.model';

@Injectable({
  providedIn: 'root'
})
export class CoverService {

  private apiUrl = 'http://localhost:5107/api/covers'

  constructor(private http: HttpClient) {}

  getCovers(): Observable<Cover[]> {
    return this.http.get<Cover[]>(this.apiUrl);
  }
  getCoverById(id: number): Observable<Cover> {
    return this.http.get<Cover>(`${this.apiUrl}/${id}`);
  }
  updateCover(id: number, cover: Cover): Observable<void> {
    const headers = this.ensureTokenAuthorization();

    return this.http.put<void>(`${this.apiUrl}/${id}`, cover, { headers });
  }

  deleteCover(id: number): Observable<void> {
    const headers = this.ensureTokenAuthorization();

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
  
  private ensureTokenAuthorization() {
    const token = localStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return headers;
  }
}
