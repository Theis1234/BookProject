import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { Cover } from '../models/cover.model';
import { CoverDTO } from '../models/cover-dto';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CoverService extends BaseService<Cover> {
  protected apiUrl = 'http://localhost:5107/api/covers';

    createCover(cover: CoverDTO): Observable<Cover> {
      return this.http.post<Cover>(`${this.apiUrl}`, cover, {
        headers: this.getAuthHeaders(),
      });
    }
  searchCovers(title?: string, digitalOnly?: boolean): Observable<Cover[]> {
    let params: any = {};

    if (title) params.title = title;
    if (digitalOnly !== undefined) params.digitalOnly = digitalOnly;

    return this.http.get<Cover[]>(this.apiUrl, { params });
  }
  updateCover(id: number, cover: CoverDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, cover, {
      headers: this.getAuthHeaders(),
    });
  }
}
