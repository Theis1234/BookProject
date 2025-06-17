import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { CreateBookDTO } from '../models/create-book-dto';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:5107/api/books'

  private http = inject(HttpClient);

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }
  createBook(book : CreateBookDTO): Observable<Book> {
    const headers = this.ensureTokenAuthorization();

    return this.http.post<Book>(`${this.apiUrl}`, book, { headers});
  }
  updateBook(id: number, book: Book): Observable<void> {
    const headers = this.ensureTokenAuthorization();

    return this.http.put<void>(`${this.apiUrl}/${id}`, book, { headers });
  }
  searchBooks(title?: string, genre?: string, authorName?: string): Observable<Book[]> {
  let params: any = {};

  if (title) params.title = title;
  if (genre) params.genre = genre;
  if (authorName) params.authorName = authorName;

  return this.http.get<Book[]>(this.apiUrl, { params });
}

  deleteBook(id: number): Observable<void> {
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
