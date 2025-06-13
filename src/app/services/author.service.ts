import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiUrl = 'http://localhost:5107/api/authors'

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }
  getAuthorById(id : number): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/${id}`);
  }
  updateAuthor(id: number, author: Author): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${id}`, author);
}
}
