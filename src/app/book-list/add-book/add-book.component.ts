import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/author.service';
import { CreateBookDTO } from '../../models/create-book-dto';

@Component({
  selector: 'app-add-book',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  authors: Author[] = [];
  book: CreateBookDTO = {
  title: '',
  genre: '',
  publishedDate: '',
  numberOfPages: 0,
  basePrice: 0,
  authorId: 0
};

  constructor(
    private bookService: BookService, 
    private authorService: AuthorService,
    private router: Router, 
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
  this.authorService.getAuthors().subscribe(authors => {
    this.authors = authors;
  });
}


  onSubmit() {
    if (!this.book) return;

    this.bookService.createBook(this.book).subscribe({
      next: () => {
        alert('Book added successfully!');
        this.router.navigate(['/books']);
      },
      error: () => alert('Failed to add book.')
    });
  }
}