import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Artist } from '../models/artist.model';
import { ArtistService } from '../services/artist.service';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-artist',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  isAdminUser: boolean = false;
  artists: Artist[] = [];

  constructor(private artistService: ArtistService, private authService : AuthService) {}

  ngOnInit(): void {
    this.artistService.getArtists().subscribe({
      next: (data) => (this.artists = data),
      error: (err) => console.error('Error loading artists', err)
    });
    this.authService.role$.subscribe(role => { this.isAdminUser = role === 'Admin' });
  }
}
