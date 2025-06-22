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
import { AuthorService } from '../../services/author.service';
import { AuthorDTO } from '../../models/author-dto';
import { Nationality } from '../../models/nationality';
import { Publisher } from '../../models/publisher';
import { Education } from '../../models/education';
import { PublisherService } from '../../services/publisher.service';
import { EducationService } from '../../services/education.service';
import { NationalityService } from '../../services/nationality.service';

@Component({
  selector: 'app-add-author',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.css',
})
export class AddAuthorComponent implements OnInit {
  ngOnInit(): void {
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
    nationalities: Nationality[] = [];
    publishers: Publisher[] = [];
    educations: Education[] = [];

  private authorService = inject(AuthorService);
  private publisherService = inject(PublisherService)
  private educationService = inject(EducationService)
  private nationalityService = inject(NationalityService)
  private fb = inject(FormBuilder);
  private router = inject(Router);

  addAuthorForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    nationalityId: [null, Validators.required],
    publisherId: [null],
    educationId: [null],
    dateOfBirth: ['', [Validators.required]],
    numberOfBooksPublished: [0, [Validators.max(100000)]],
    lastPublishedBook: ['', [Validators.maxLength(100)]],
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

  onSubmit() {
    if (this.addAuthorForm.invalid) {
      this.addAuthorForm.markAllAsTouched();
      return;
    }

    const author: AuthorDTO = this.addAuthorForm.value;

    this.authorService.create(author).subscribe({
      next: () => {
        alert('Author added successfully!');
        this.router.navigate(['/authors']);
      },
      error: () => alert('Failed to add author.'),
    });
  }
}
