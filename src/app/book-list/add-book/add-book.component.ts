import { Component, inject } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/author.service';
import { BookDTO } from '../../models/book-dto';
import { Genre } from '../../models/genre';
import { GenreService } from '../../services/genre.service';

@Component({
  selector: 'app-add-book',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  genres: Genre[] = [];

  authors: Author[] = [];
  private bookService = inject(BookService);
  private authorService = inject(AuthorService);
  private genreService = inject(GenreService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  addBookForm: FormGroup = this.fb.group({
    title: ['', [Validators.maxLength(50)]],
    genreId: [null],
    publishedDate: ['', [Validators.required]],
    numberOfPages: [0, [Validators.required, Validators.min(1), Validators.max(100000)]],
    basePrice: [0, [Validators.required, Validators.min(0), Validators.max(100000)]],
    authorId: [null, [Validators.required]],
  });

  ngOnInit() {
    this.authorService.getAll().subscribe((authors) => {
      this.authors = authors;
    });
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

  onSubmit() {
    if (this.addBookForm.invalid) {
      this.addBookForm.markAllAsTouched();
      return;
    }

    const createdBook: BookDTO = this.addBookForm.value;

    this.bookService.create(createdBook).subscribe({
      next: () => {
        alert('Book added successfully!');
        this.router.navigate(['/books']);
      },
      error: () => alert('Failed to add book.'),
    });
  }
  allowOnlyNumbers(event: KeyboardEvent): void {
    const key = event.key;
    if (!/^\d$/.test(key)) {
      event.preventDefault();
    }
  }
}
