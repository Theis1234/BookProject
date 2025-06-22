import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ArtistDTO } from '../../models/artist-dto';
import { ArtistService } from '../../services/artist.service';
import { NationalityService } from '../../services/nationality.service';
import { Nationality } from '../../models/nationality';

@Component({
  selector: 'app-add-artist',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-artist.component.html',
  styleUrl: './add-artist.component.css',
})
export class AddArtistComponent implements OnInit {
  ngOnInit(): void {
    this.nationalityService.getAll().subscribe({
      next: (data) => (this.nationalities = data),
      error: () => alert('Failed to load nationalities.'),
    });
  }
  nationalities: Nationality[] = [];
  private fb = inject(FormBuilder);
  private artistService = inject(ArtistService);
  private nationalityService = inject(NationalityService);
  private router = inject(Router);

  addArtistForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    nationalityId: [null, Validators.required],
    dateOfBirth: ['', [Validators.required]],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      postalCode: [''],
      country: [''],
    }),
    contactInfo: this.fb.group({
      email: [''],
      phone: [''],
      website: [''],
    }),

    socialLinks: this.fb.group({
      instagram: [''],
      twitter: [''],
      website: [''],
    }),
  });

  onSubmit() {
    if (this.addArtistForm.invalid) {
      this.addArtistForm.markAllAsTouched();
      return;
    }

    const artist: ArtistDTO = this.addArtistForm.value;

    this.artistService.create(artist).subscribe({
      next: () => {
        alert('Artist added successfully!');
        this.router.navigate(['/artists']);
      },
      error: () => alert('Failed to add artist.'),
    });
  }
}
