import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist.model';
import { CreateArtistDTO } from '../models/create-artist-dto';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ArtistService extends BaseService<Artist> {
  protected apiUrl = 'http://localhost:5107/api/artists';

  createArtist(artist: CreateArtistDTO): Observable<Artist> {
    return this.http.post<Artist>(`${this.apiUrl}`, artist, {
      headers: this.getAuthHeaders(),
    });
  }
  searchArtists(
    firstName?: string,
    lastName?: string,
    nationality?: string
  ): Observable<Artist[]> {
    let params: any = {};

    if (firstName) params.firstName = firstName;
    if (lastName) params.lastName = lastName;
    if (nationality) params.nationality = nationality;

    return this.http.get<Artist[]>(this.apiUrl, { params });
  }

  updateArtist(id: number, artist: Artist): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, artist, {
      headers: this.getAuthHeaders(),
    });
  }
}
