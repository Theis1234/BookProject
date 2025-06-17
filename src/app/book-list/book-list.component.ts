import { Component, OnInit, inject } from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BookSearchComponent } from '../search/book-search/book-search.component';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, FormsModule, BookSearchComponent, RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  isAdminUser: boolean = false;
  books: Book[] = [];
  filteredBooks: Book[] = [];

  private bookService = inject(BookService);
  private authService = inject(AuthService);
  
  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.filteredBooks = books;
      },
      error: (err) => alert('Failed to load books'),
    });
    this.authService.role$.subscribe((role) => {
      this.isAdminUser = role === 'Admin';
    });
  }
  onSearch(searchData: {
    title?: string;
    genre?: string;
    authorName?: string;
  }): void {
    this.bookService
      .searchBooks(searchData.title, searchData.genre, searchData.authorName)
      .subscribe({
        next: (books) => (this.filteredBooks = books),
        error: () => alert('Failed to search books'),
      });
  }
}
