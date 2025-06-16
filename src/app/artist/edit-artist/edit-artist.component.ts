import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-edit-artist',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-artist.component.html',
  styleUrl: './edit-artist.component.css'
})
export class EditArtistComponent implements OnInit{
  editArtistForm: FormGroup;
  submitted = false;
  artist: Artist | null = null;

  constructor(
    private fb: FormBuilder,
    private artistService: ArtistService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {
      this.editArtistForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      nationality: [''],
      dateOfBirth: ['',Validators.required],
      artistCovers: this.fb.array([])
    })

  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.artistService.getArtistById(id).subscribe({
      next: (data) => {
        this.editArtistForm.patchValue(data);
      },
      error: () => alert('Error loading artist')
    });
  }
  onSubmit() {
     if (this.editArtistForm.invalid){
      this.editArtistForm.markAllAsTouched()
      return;
    };

    const updatedArtist: Artist = {
          ...this.editArtistForm.value,
          id: Number(this.route.snapshot.paramMap.get('id'))
        };

    this.artistService.updateArtist(updatedArtist.id, updatedArtist).subscribe({
      next: () => {
        alert('Artist updated successfully!');
        this.router.navigate(['/artists']);
      },
      error: () => alert('Failed to update artist.')
    });
  }
  onDelete() {
  if (!this.artist) return;

  this.artistService.deleteArtist(this.artist.id).subscribe({
      next: () => {
        alert('Artist deleted successfully!');
        this.router.navigate(['/artists']);
      },
      error: () => alert('Failed to delete artist.')
    });
}
}
