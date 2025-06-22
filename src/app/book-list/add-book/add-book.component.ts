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

@Component({
  selector: 'app-add-book',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  submitted = false;

  authors: Author[] = [];
  private bookService = inject(BookService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authorService = inject(AuthorService);

  addBookForm: FormGroup = this.fb.group({
    title: ['', [Validators.maxLength(50)]],
    genre: ['', [Validators.maxLength(30)]],
    publishedDate: ['', [Validators.required]],
    numberOfPages: [0, [Validators.required, Validators.min(1), Validators.max(100000)]],
    basePrice: [0, [Validators.required, Validators.min(0), Validators.max(100000)]],
    authorId: [null, [Validators.required]],
  });

  ngOnInit() {
    this.authorService.getAll().subscribe((authors) => {
      this.authors = authors;
    });
  }

  onSubmit() {
    if (this.addBookForm.invalid) {
      this.addBookForm.markAllAsTouched();
      return;
    }

    this.submitted = true;

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
