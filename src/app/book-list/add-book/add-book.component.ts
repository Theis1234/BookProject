import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/author.service';
import { CreateBookDTO } from '../../models/create-book-dto';

@Component({
  selector: 'app-add-book',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {

  addBookForm: FormGroup;
  submitted = false;

  authors: Author[] = [];


  constructor(
    private fb: FormBuilder,
    private bookService: BookService, 
    private authorService: AuthorService,
    private router: Router
  ) {
    this.addBookForm = this.fb.group({
      title: [''],
      genre: [''],
      publishedDate: ['', Validators.required],
      numberOfPages: [0, [Validators.required, Validators.min(1)]],
      basePrice: [0, [Validators.required, Validators.min(0)]],
      authorId: [null, Validators.required]
    });
  }
  
  ngOnInit() {
  this.authorService.getAuthors().subscribe(authors => {
    this.authors = authors;
  });
}


  onSubmit() {
    if (this.addBookForm.invalid){
      this.addBookForm.markAllAsTouched()
      return;
    };

    this.submitted = true;

    const createdBook: CreateBookDTO = this.addBookForm.value;

    this.bookService.createBook(createdBook).subscribe({
      next: () => {
        alert('Book added successfully!');
        this.router.navigate(['/books']);
      },
      error: () => alert('Failed to add book.')
    });
  }
  allowOnlyNumbers(event: KeyboardEvent): void {
const key = event.key;
  if (!/^\d$/.test(key)) {
    event.preventDefault();
  }
}
}