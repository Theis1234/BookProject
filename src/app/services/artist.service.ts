import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist.model';
import { ArtistDTO } from '../models/artist-dto';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ArtistService extends BaseService<Artist, ArtistDTO> {
  protected apiUrl = 'http://localhost:5107/api/artists';

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
}
