import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../models/author.model';
import { CreateAuthorDTO } from '../models/create-author-dto';

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
  createAuthor(author : CreateAuthorDTO): Observable<Author> {
    const headers = this.ensureTokenAuthorization();

    return this.http.post<Author>(`${this.apiUrl}`, author, { headers });
  }
    searchAuthors(firstName?: string, lastName?: string, nationality?: string): Observable<Author[]> {
      let params: any = {};
    
      if (firstName) params.firstName = firstName;
      if (lastName) params.lastName = lastName;
      if (nationality) params.nationality = nationality;
    
      return this.http.get<Author[]>(this.apiUrl, { params });
    }

  updateAuthor(id: number, author: Author): Observable<void> {
  const headers = this.ensureTokenAuthorization();

  return this.http.put<void>(`${this.apiUrl}/${id}`, author, { headers });
}
  deleteAuthor(id: number): Observable<void> {
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
