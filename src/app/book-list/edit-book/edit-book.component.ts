import { Component, inject } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author.model';
import { BookDTO } from '../../models/book-dto';
import { AbstractEditComponent } from '../../shared/abstract-edit';
import { Observable } from 'rxjs';
import { AuthorDTO } from '../../models/author-dto';

@Component({
  selector: 'app-edit-book',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent extends AbstractEditComponent<
  Book,
  BookDTO
> {
  protected override entityName = 'Book';
  protected override getService(): { delete(id: number): Observable<any>; update(id: number, dto: any): Observable<any>; getById(id: number): Observable<any>; } {
    return this.bookService
  }
  protected override buildForm(): FormGroup {
    return this.fb.group({
    title: ['', [Validators.maxLength(50)]],
    genre: ['', [Validators.maxLength(30)]],
    publishedDate: ['', [Validators.required]],
    numberOfPages: [0, [Validators.required, Validators.min(1), Validators.max(100000)]],
    basePrice: [0, [Validators.required, Validators.min(0), Validators.max(100000)]],
    authorId: [null, [Validators.required]],
    });
  }
  protected override patchForm(data: Book): void {
    this.item = data;
    this.form.patchValue(data);
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
  }
  authors: Author[] = [];
  private bookService = inject(BookService);
  private authorService = inject(AuthorService);
}
