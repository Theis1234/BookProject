import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../models/author.model';
import { AuthorDTO } from '../models/author-dto';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorService extends BaseService<Author, AuthorDTO> {
  protected apiUrl = 'http://localhost:5107/api/authors';

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
}
