import { Injectable } from '@angular/core';
import { Genre } from '../models/genre';
import { GenreDTO } from '../models/genre-dto';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GenreService extends BaseService<
  Genre,
  GenreDTO
> {
  protected apiUrl = 'http://localhost:5107/api/genres';
}