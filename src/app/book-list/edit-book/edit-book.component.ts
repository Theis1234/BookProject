import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent {

  book: Book | null = null;

  constructor(
    private bookService: BookService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookById(id).subscribe({
      next: (data) => this.book = data,
      error: () => alert('Error loading book')
    });
  }
  onSubmit() {
    if (!this.book) return;

    this.bookService.updateBook(this.book.id, this.book).subscribe({
      next: () => {
        alert('Book updated successfully!');
        this.router.navigate(['/books']);
      },
      error: () => alert('Failed to update book.')
    });
  }
  onDelete() {
  if (!this.book) return;

  this.bookService.deleteBook(this.book.id).subscribe({
      next: () => {
        alert('Book deleted successfully!');
        this.router.navigate(['/books']);
      },
      error: () => alert('Failed to delete book.')
    });
}
}