import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateArtistDTO } from '../../models/create-artist-dto';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-add-artist',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-artist.component.html',
  styleUrl: './add-artist.component.css'
})
export class AddArtistComponent {
  addArtistForm: FormGroup;
  submitted = false;
  

  constructor(
    private fb: FormBuilder,
    private artistService: ArtistService, 
    private router: Router
  ) {
    this.addArtistForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      nationality: [''],
      dateOfBirth: ['',Validators.required]
    })

  }

  onSubmit() {
    if (this.addArtistForm.invalid){
      this.addArtistForm.markAllAsTouched()
      return;
    };

    this.submitted = true;

    const artist: CreateArtistDTO = this.addArtistForm.value;

    this.artistService.createArtist(artist).subscribe({
      next: () => {
        alert('Artist added successfully!');
        this.router.navigate(['/artists']);
      },
      error: () => alert('Failed to add artist.')
    });
  }
}