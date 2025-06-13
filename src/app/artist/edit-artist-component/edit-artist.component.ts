import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-edit-artist',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-artist.component.html',
  styleUrl: './edit-artist.component.css'
})
export class EditArtistComponent implements OnInit{
onDelete() {
throw new Error('Method not implemented.');
}
  artist: Artist | null = null;

  constructor(
    private artistService: ArtistService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.artistService.getArtistById(id).subscribe({
      next: (data) => this.artist = data,
      error: () => alert('Error loading artist')
    });
  }
  onSubmit() {
    if (!this.artist) return;

    this.artistService.updateArtist(this.artist.id, this.artist).subscribe({
      next: () => {
        alert('Artist updated successfully!');
        this.router.navigate(['/artists']);
      },
      error: () => alert('Failed to update artist.')
    });
  }

}
