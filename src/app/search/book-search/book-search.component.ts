import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Author } from '../../models/author.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-search',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.css',
})
export class BookSearchComponent implements OnInit {
  @Output() search = new EventEmitter<{ title?: string; genre?: string; authorName?: string;}>();
  books: Book[] = [];
  hasSearched = false;
  private fb = inject(FormBuilder);

    searchForm: FormGroup = this.fb.group({
      title: [''],
      genre: [''],
      authorName: [''],
    });
  

  ngOnInit(): void {}

  onSubmit(): void {
    this.search.emit(this.searchForm.value);
  }
}
