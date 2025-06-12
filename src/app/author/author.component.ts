import { Component, OnInit } from '@angular/core';
import { Author } from '../models/author.model';
import { AuthorService } from '../services/author.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-author',
  imports: [CommonModule],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit {
    isAdminUser: boolean = false;
    
    authors: Author[] = [];

    constructor(private authorService: AuthorService, private authService: AuthService) {}
  
    ngOnInit(): void {
      this.authorService.getAuthors().subscribe({
        next: (data) => this.authors = data,
        error: (err) => console.error('Error loading authors', err)
      });

      this.authService.role$.subscribe(role => { this.isAdminUser = role === 'Admin' });
    }

}
