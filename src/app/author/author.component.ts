import { Component, OnInit } from '@angular/core';
import { Author } from '../models/author.model';
import { AuthorService } from '../services/author.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author',
  imports: [CommonModule],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit {
    authors: Author[] = [];
    constructor(private authorService: AuthorService) {}
  
    ngOnInit(): void {
      this.authorService.getAuthors().subscribe({
        next: (data) => this.authors = data,
        error: (err) => console.error('Error loading authors', err)
      });
    }
}
