import { Component, OnInit } from '@angular/core';
import { Author } from '../models/author.model';
import { AuthorService } from '../services/author.service';
import { CommonModule } from '@angular/common';
import { Artist } from '../models/artist.model';
import { ArtistService } from '../services/artist.service';

@Component({
  selector: 'app-artist',
  imports: [CommonModule],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css'
})
export class ArtistComponent implements OnInit {
    artists: Artist[] = [];
    constructor(private artistService: ArtistService) {}
  
    ngOnInit(): void {
      this.artistService.getArtists().subscribe({
        next: (data) => this.artists = data,
        error: (err) => console.error('Error loading artists', err)
      });
    }
}
