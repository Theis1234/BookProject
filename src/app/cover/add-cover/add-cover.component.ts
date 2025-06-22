import { Component, inject } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CoverService } from '../../services/cover.service';
import { CoverDTO } from '../../models/cover-dto';
import { Artist } from '../../models/artist.model';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-add-cover',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-cover.component.html',
  styleUrl: './add-cover.component.css',
})
export class AddCoverComponent {
  submitted = false;
  books: Book[] = [];
  artists: Artist[] = [];

  private bookService = inject(BookService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private coverService = inject(CoverService);
  private artistService = inject(ArtistService);

  addCoverForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    digitalOnly: [false],
    bookId: [null, [Validators.required]],
    artistIds: this.fb.array([], [Validators.required]),
  });

  ngOnInit() {
    this.bookService.getAll().subscribe((books) => {
      this.books = books;
    });
    this.artistService.getAll().subscribe((artists) => {
      this.artists = artists;
    });
  }
  onSubmit() {
    if (this.addCoverForm.invalid) {
      this.addCoverForm.markAllAsTouched();
      return;
    }

    this.submitted = true;

    const createdCover: CoverDTO = this.addCoverForm.value;

    const artistIds = this.addCoverForm.get('artistIds') as FormArray;
    if (artistIds.length === 0) {
      alert('Please select at least one artist.');
      return;
    }

    this.coverService.create(createdCover).subscribe({
      next: () => {
        alert('Cover added successfully!');
        this.router.navigate(['/covers']);
      },
      error: () => alert('Failed to add cover.'),
    });
  }
  onArtistToggle(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const artistId = parseInt(checkbox.value, 10);
    const artistIds = this.addCoverForm.get('artistIds') as FormArray;

    if (checkbox.checked) {
      artistIds.push(this.fb.control(artistId));
    } else {
      const index = artistIds.controls.findIndex(
        (ctrl) => ctrl.value === artistId
      );
      if (index >= 0) {
        artistIds.removeAt(index);
      }
    }
  }
}
