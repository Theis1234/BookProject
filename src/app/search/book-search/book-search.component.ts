import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  searchForm: FormGroup;
  books: Book[] = [];
  hasSearched = false;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      title: [''],
      genre: [''],
      authorName: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.search.emit(this.searchForm.value);
  }
}
