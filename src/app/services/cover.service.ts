import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
