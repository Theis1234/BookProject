import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/author.service';
import { CreateArtistDTO } from '../../models/create-artist-dto';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-add-artist',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-artist.component.html',
  styleUrl: './add-artist.component.css'
})
export class AddArtistComponent {
  artist: CreateArtistDTO = {
  firstName: '',
  lastName: '',
  nationality: '',
  dateOfBirth: ''
};

  constructor(
    private artistService: ArtistService, 
    private router: Router
  ) {}

  onSubmit() {
    if (!this.artist) return;

    this.artistService.createArtist(this.artist).subscribe({
      next: () => {
        alert('Artist added successfully!');
        this.router.navigate(['/artists']);
      },
      error: () => alert('Failed to add artist.')
    });
  }
}