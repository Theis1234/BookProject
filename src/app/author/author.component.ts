import { Component, inject, OnInit } from '@angular/core';
import { Author } from '../models/author.model';
import { AuthorService } from '../services/author.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthorSearchComponent } from '../search/author-search/author-search.component';

@Component({
  selector: 'app-author',
  imports: [CommonModule, FormsModule, RouterLink, AuthorSearchComponent],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit {
    isAdminUser: boolean = false;
    
    authors: Author[] = [];
    filteredAuthors: Author[] = [];
    private authorService = inject(AuthorService);
    private authService = inject(AuthService);
  
    ngOnInit(): void {
      this.authorService.getAuthors().subscribe({
        next: authors => {
        this.authors = authors,
        this.filteredAuthors = authors
      },
        error: (err) => console.error('Error loading authors', err)
      });

      this.authService.role$.subscribe(role => { this.isAdminUser = role === 'Admin' });
    }
    onSearch(searchData: { firstName?: string, lastName?: string, nationality?: string }): void {
  this.authorService.searchAuthors(searchData.firstName, searchData.lastName, searchData.nationality).subscribe({
    next: authors => this.filteredAuthors = authors,
    error: () => alert('Failed to search books')
  });
}
}
