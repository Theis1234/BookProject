import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { BookDTO } from '../models/book-dto';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class BookService extends BaseService<Book, BookDTO> {
  protected apiUrl = 'http://localhost:5107/api/books';

  updateBook(id: number, book: BookDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, book, {
      headers: this.getAuthHeaders(),
    });
  }
  searchBooks(
    title?: string,
    genre?: string,
    authorName?: string
  ): Observable<Book[]> {
    let params: any = {};

    if (title) params.title = title;
    if (genre) params.genre = genre;
    if (authorName) params.authorName = authorName;

    return this.http.get<Book[]>(this.apiUrl, { params });
  }
}
