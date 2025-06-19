import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-edit-artist',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-artist.component.html',
  styleUrl: './edit-artist.component.css',
})
export class EditArtistComponent implements OnInit {
  submitted = false;
  artist: Artist | null = null;

  private fb = inject(FormBuilder);
  private artistService = inject(ArtistService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  editArtistForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    nationality: ['', [Validators.maxLength(30)]],
    dateOfBirth: ['', [Validators.required]],
    artistCovers: this.fb.array([]),
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.artistService.getById(id).subscribe({
      next: (data) => {
        this.artist = data;
        this.editArtistForm.patchValue(data);
      },
      error: () => alert('Error loading artist'),
    });
  }
  onSubmit() {
    if (this.editArtistForm.invalid) {
      this.editArtistForm.markAllAsTouched();
      return;
    }

    const updatedArtist: Artist = {
      ...this.editArtistForm.value,
      id: Number(this.route.snapshot.paramMap.get('id')),
    };

    this.artistService.updateArtist(updatedArtist.id, updatedArtist).subscribe({
      next: () => {
        alert('Artist updated successfully!');
        this.router.navigate(['/artists']);
      },
      error: () => alert('Failed to update artist.'),
    });
  }
  onDelete() {
    if (!this.artist) return;

    this.artistService.delete(this.artist.id).subscribe({
      next: () => {
        alert('Artist deleted successfully!');
        this.router.navigate(['/artists']);
      },
      error: () => alert('Failed to delete artist.'),
    });
  }
}
