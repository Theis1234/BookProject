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
import { AbstractEditComponent } from '../../shared/abstract-edit';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-cover',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-cover.component.html',
  styleUrl: './edit-cover.component.css',
})
export class EditCoverComponent extends AbstractEditComponent<Cover,CoverDTO> {
  protected override entityName = 'Cover';
  protected override getService(): { delete(id: number): Observable<any>; update(id: number, dto: any): Observable<any>; getById(id: number): Observable<any>; } {
    return this.coverService
  }
  protected override buildForm(): FormGroup {
    return this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    digitalOnly: [false],
    bookId: [null, [Validators.required]],
    artistIds: this.fb.array([], [Validators.required]),
  });
  }
  protected override patchForm(data: Cover): void {
    this.item = data;
    this.form.patchValue(data);

    const artistIdsFormArray = this.form.get('artistIds') as FormArray;
    artistIdsFormArray.clear();

    const selectedArtistIds = data.artistCovers?.map((ac) => ac.artistId) ?? [];
    selectedArtistIds.forEach((id) => {
      artistIdsFormArray.push(this.fb.control(id));
    });
  }
  protected override onInitExtras(): void {
     this.bookService.getAll().subscribe({
      next: (books) => (this.books = books),
      error: () => alert('Error loading books'),
    });

    this.artistService.getAll().subscribe({
      next: (artists) => (this.artists = artists),
      error: () => alert('Error loading artists'),
    });
  }
  books: Book[] = [];
  artists: Artist[] = [];
  artistIds: number[] = [];

  private bookService = inject(BookService);
  private coverService = inject(CoverService);
  private artistService = inject(ArtistService);
  
  onArtistToggle(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const artistId = parseInt(checkbox.value, 10);
    const artistIds = this.form.get('artistIds') as FormArray;

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
