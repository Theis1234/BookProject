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
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author.model';
import { BookDTO } from '../../models/book-dto';
import { AbstractEditComponent } from '../../shared/abstract-edit';
import { Observable } from 'rxjs';
import { AuthorDTO } from '../../models/author-dto';
import { Genre } from '../../models/genre';
import { GenreService } from '../../services/genre.service';
import { Edition } from '../../models/edition';

@Component({
  selector: 'app-edit-book',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent extends AbstractEditComponent<Book, BookDTO> {
  genres: Genre[] = [];
  protected override entityName = 'Book';
  protected override getService(): {
    delete(id: number): Observable<any>;
    update(id: number, dto: any): Observable<any>;
    getById(id: number): Observable<any>;
  } {
    return this.bookService;
  }
  protected override buildForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.maxLength(50)]],
      genreId: [null],
      publishedDate: ['', [Validators.required]],
      numberOfPages: [
        0,
        [Validators.required, Validators.min(1), Validators.max(100000)],
      ],
      basePrice: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100000)],
      ],
      authorId: [null, [Validators.required]],
      editions: this.fb.array([]),
    });
  }
  private createEditionFormGroup(edition: Edition): FormGroup {
    return this.fb.group({
      id: [edition.id],
      format: [edition.format, Validators.required],
      releaseDate: [edition.releaseDate, Validators.required],
      bookId: [edition.bookId],
    });
  }
  protected override patchForm(data: Book): void {
    this.item = data;
    this.form.patchValue(data);

    const editionsFormArray = this.form.get('editions') as FormArray;
    editionsFormArray.clear();

    data.editions.forEach((edition) => {
      editionsFormArray.push(this.createEditionFormGroup(edition));
    });
  }
  protected override redirectAfterSave(): void {
    this.router.navigate([`/${this.entityName.toLowerCase()}s`]);
  }
  protected override onInitExtras(): void {
    this.authorService.getAll().subscribe({
      next: (authors) => {
        this.authors = authors;
      },
      error: () => alert('Error loading authors'),
    });
    this.genreService.getAll().subscribe((data) => {
      this.genres = data;
    });
  }
  authors: Author[] = [];
  private bookService = inject(BookService);
  private authorService = inject(AuthorService);
  private genreService = inject(GenreService);
}
