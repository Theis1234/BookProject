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
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author.model';
import { AuthorDTO } from '../../models/author-dto';
import { AbstractEditComponent } from '../../shared/abstract-edit';
import { Observable } from 'rxjs';
import { Nationality } from '../../models/nationality';
import { Publisher } from '../../models/publisher';
import { Education } from '../../models/education';
import { NationalityService } from '../../services/nationality.service';
import { PublisherService } from '../../services/publisher.service';
import { EducationService } from '../../services/education.service';

@Component({
  selector: 'app-edit-author',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-author.component.html',
  styleUrl: './edit-author.component.css',
})
export class EditAuthorComponent extends AbstractEditComponent<
  Author,
  AuthorDTO
> {
  nationalities: Nationality[] = [];
  publishers: Publisher[] = [];
  educations: Education[] = [];

  protected override getService(): {
    delete(id: number): Observable<any>;
    update(id: number, dto: any): Observable<any>;
    getById(id: number): Observable<any>;
  } {
    return this.authorService;
  }
  protected override entityName = 'Author';

  protected override onInitExtras(): void {
    this.nationalityService.getAll().subscribe((data) => {
      this.nationalities = data;
    });
    this.publisherService.getAll().subscribe((data) => {
      console.log('PUBLISHERS:', data);
      this.publishers = data;
    });
    this.educationService.getAll().subscribe((data) => {
      this.educations = data;
    });
  }

  protected override buildForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      nationalityId: [null, Validators.required],
      dateOfBirth: ['', [Validators.required]],
      numberOfBooksPublished: [0, [Validators.max(100000)]],
      lastPublishedBook: ['', [Validators.maxLength(100)]],
      educationId: [null],
      publisherId: [null],
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

      biography: this.fb.group({
        shortBio: [''],
        fullBio: [''],
      }),
    });
  }
  private authorService = inject(AuthorService);
  private nationalityService = inject(NationalityService);
  private publisherService = inject(PublisherService);
  private educationService = inject(EducationService)
}
