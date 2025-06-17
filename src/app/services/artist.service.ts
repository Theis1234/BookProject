import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist.model';
import { CreateArtistDTO } from '../models/create-artist-dto';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private apiUrl = 'http://localhost:5107/api/artists'

  constructor(private http: HttpClient) { }

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.apiUrl);
  }
  getArtistById(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/${id}`);
  }
  createArtist(artist : CreateArtistDTO): Observable<Artist> {
    const headers = this.ensureTokenAuthorization();

    return this.http.post<Artist>(`${this.apiUrl}`, artist, { headers});
  }
  searchArtists(firstName?: string, lastName?: string, nationality?: string): Observable<Artist[]> {
    let params: any = {};
  
    if (firstName) params.firstName = firstName;
    if (lastName) params.lastName = lastName;
    if (nationality) params.nationality = nationality;
  
    return this.http.get<Artist[]>(this.apiUrl, { params });
  }

  updateArtist(id: number, artist: Artist): Observable<void> {

    const headers = this.ensureTokenAuthorization();

    return this.http.put<void>(`${this.apiUrl}/${id}`, artist, { headers });
  }

  deleteArtist(id: number): Observable<void> {
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
