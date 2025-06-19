import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../models/author.model';
import { CreateAuthorDTO } from '../models/create-author-dto';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorService extends BaseService<Author> {
  protected apiUrl = 'http://localhost:5107/api/authors';

  createAuthor(author: CreateAuthorDTO): Observable<Author> {
    return this.http.post<Author>(`${this.apiUrl}`, author, {
      headers: this.getAuthHeaders(),
    });
  }
  searchAuthors(
    firstName?: string,
    lastName?: string,
    nationality?: string
  ): Observable<Author[]> {
    let params: any = {};

    if (firstName) params.firstName = firstName;
    if (lastName) params.lastName = lastName;
    if (nationality) params.nationality = nationality;

    return this.http.get<Author[]>(this.apiUrl, { params });
  }

  updateAuthor(id: number, author: Author): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, author, {
      headers: this.getAuthHeaders(),
    });
  }
}
