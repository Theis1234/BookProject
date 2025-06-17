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
import { Cover } from '../../models/cover.model';
import { CoverService } from '../../services/cover.service';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist.model';
import { CoverDTO } from '../../models/cover-dto';

@Component({
  selector: 'app-edit-cover',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-cover.component.html',
  styleUrl: './edit-cover.component.css',
})
export class EditCoverComponent {
  submitted = false;
  books: Book[] = [];
  artists: Artist[] = [];
  artistIds: number[] = [];
  cover: Cover | null = null;

  private bookService = inject(BookService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private coverService = inject(CoverService);
  private artistService = inject(ArtistService);
  private route = inject(ActivatedRoute);

  editCoverForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    digitalOnly: [false],
    bookId: [null, [Validators.required]],
    artistIds: this.fb.array([], [Validators.required]),
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.coverService.getCoverById(id).subscribe({
      next: (data) => {
        this.cover = data;
        this.editCoverForm.patchValue(data);

        this.bookService.getBooks().subscribe((books) => {
          this.books = books;
        });

        this.artistService.getArtists().subscribe((artists) => {
          this.artists = artists;
          const artistFormArray = this.editCoverForm.get(
            'artistIds'
          ) as FormArray;
          const selectedArtistIds =
            data.artistCovers?.map((ac) => ac.artistId) ?? [];

          selectedArtistIds.forEach((id) => {
            artistFormArray.push(this.fb.control(id));
          });

          this.artistIds = selectedArtistIds;
        });
      },
      error: () => alert('Error loading cover'),
    });
  }

  onSubmit() {
    if (this.editCoverForm.invalid) {
      this.editCoverForm.markAllAsTouched();
      return;
    }

    this.submitted = true;

    const updatedCover: CoverDTO = this.editCoverForm.value;

    const artistIds = this.editCoverForm.get('artistIds') as FormArray;
    if (this.artists.length === 0) {
      alert('Please select at least one artist.');
      return;
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.coverService.updateCover(id, updatedCover).subscribe({
      next: () => {
        alert('Cover updated successfully!');
        this.router.navigate(['/covers']);
      },
      error: () => alert('Failed to update cover.'),
    });
  }
  onDelete() {
    if (!this.cover) return;

    this.coverService.deleteCover(this.cover.id).subscribe({
      next: () => {
        alert('Cover deleted successfully!');
        this.router.navigate(['/covers']);
      },
      error: () => alert('Failed to delete cover.'),
    });
  }
  onArtistToggle(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const artistId = parseInt(checkbox.value, 10);
    const artistIds = this.editCoverForm.get('artistIds') as FormArray;

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
