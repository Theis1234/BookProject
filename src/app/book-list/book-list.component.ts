import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit{
  isAdminUser: boolean = false;
  books: Book[] = [];
  
  constructor(private bookService: BookService, private authService: AuthService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error('Error loading books', err)
    });
    this.authService.role$.subscribe(role => { this.isAdminUser = role === 'Admin' });
  }

}
