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
import { ArtistDTO } from '../../models/artist-dto';
import { AbstractEditComponent } from '../../shared/abstract-edit';
import { Observable } from 'rxjs';
import { Nationality } from '../../models/nationality';
import { NationalityService } from '../../services/nationality.service';
import { Education } from '../../models/education';
import { Publisher } from '../../models/publisher';

@Component({
  selector: 'app-edit-artist',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-artist.component.html',
  styleUrl: './edit-artist.component.css',
})
export class EditArtistComponent extends AbstractEditComponent<
  Artist,
  ArtistDTO
> {
  protected override entityName = 'Artist';
  nationalities: Nationality[] = [];
  educations: Education[] = [];
  publishers: Publisher[] = []

  protected override getService(): {
    delete(id: number): Observable<any>;
    update(id: number, dto: any): Observable<any>;
    getById(id: number): Observable<any>;
  } {
    return this.artistService;
  }
  protected override buildForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      nationalityId: [null, Validators.required],
      dateOfBirth: ['', [Validators.required]],
      artistCovers: this.fb.array([]),

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
  }
  protected override patchForm(data: Artist): void {
    this.item = data;

    data.address ??= {} as any;
    data.contactInfo ??= {} as any;
    data.socialLinks ??= {} as any;

    this.form.patchValue(data as { [key: string]: any });
  }
  protected override onInitExtras(): void {
    this.nationalityService.getAll().subscribe((data) => {
      this.nationalities = data;
    });
  }
  private artistService = inject(ArtistService);
  private nationalityService = inject(NationalityService);
}
