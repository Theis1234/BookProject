import { Component, inject } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-edit-book',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent {
  submitted = false;
  book: Book | null = null;
  authors: Author[] = [];
  private bookService = inject(BookService);
  private authorService = inject(AuthorService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  editBookForm: FormGroup = this.fb.group({
    title: ['', [Validators.maxLength(50)]],
    genre: ['', [Validators.maxLength(30)]],
    publishedDate: ['', [Validators.required]],
    numberOfPages: [0, [Validators.required, Validators.min(1), Validators.max(100000)]],
    basePrice: [0, [Validators.required, Validators.min(0), Validators.max(100000)]],
    authorId: [null, [Validators.required]],
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookById(id).subscribe({
      next: (data) => {
        this.book = data;
        this.editBookForm.patchValue(data);
      },
      error: () => alert('Error loading book'),
    });
    this.authorService.getAuthors().subscribe({
      next: (authors) => {
        this.authors = authors;
      },
      error: () => alert('Error loading authors'),
    });
  }
  onSubmit() {
    if (this.editBookForm.invalid) {
      this.editBookForm.markAllAsTouched();
      return;
    }

    this.submitted = true;

    const updatedBook: Book = {
      ...this.editBookForm.value,
      id: Number(this.route.snapshot.paramMap.get('id')),
    };

    this.bookService.updateBook(updatedBook.id, updatedBook).subscribe({
      next: () => {
        alert('Book updated successfully!');
        this.router.navigate(['/books']);
      },
      error: () => alert('Failed to update book.'),
    });
  }
  onDelete() {
    if (!this.book) return;

    this.bookService.deleteBook(this.book.id).subscribe({
      next: () => {
        alert('Book deleted successfully!');
        this.router.navigate(['/books']);
      },
      error: () => alert('Failed to delete book.'),
    });
  }
}
