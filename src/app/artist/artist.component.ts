import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Artist } from '../models/artist.model';
import { ArtistService } from '../services/artist.service';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';
import { ArtistSearchComponent } from '../search/artist-search/artist-search.component';

@Component({
  selector: 'app-artist',
  imports: [CommonModule, FormsModule, RouterLink, ArtistSearchComponent],
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  isAdminUser: boolean = false;
  
  artists: Artist[] = [];
  filteredArtists: Artist[] = [];
  private artistService = inject(ArtistService);
  private authService = inject(AuthService);


  ngOnInit(): void {
    this.artistService.getAll().subscribe({
      next: artists => {
        this.artists = artists,
        this.filteredArtists = artists
      },
      error: (err) => console.error('Error loading artists', err)
    });

    this.authService.role$.subscribe(role => { this.isAdminUser = role === 'Admin' });
  }
  onSearch(searchData: { firstName?: string, lastName?: string, nationality?: string }): void {
  this.artistService.searchArtists(searchData.firstName, searchData.lastName, searchData.nationality).subscribe({
    next: artists => this.filteredArtists = artists,
    error: () => alert('Failed to search books')
  });
}
}
