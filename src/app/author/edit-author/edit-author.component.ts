import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-edit-author',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-author.component.html',
  styleUrl: './edit-author.component.css'
})
export class EditAuthorComponent implements OnInit{

  author: Author | null = null;

  constructor(
    private authorService: AuthorService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.authorService.getAuthorById(id).subscribe({
      next: (data) => this.author = data,
      error: () => alert('Error loading author')
    });
  }
  onSubmit() {
    if (!this.author) return;

    this.authorService.updateAuthor(this.author.id, this.author).subscribe({
      next: () => {
        alert('Author updated successfully!');
        this.router.navigate(['/authors']);
      },
      error: () => alert('Failed to update author.')
    });
  }
  onDelete() {
  if (!this.author) return;

  this.authorService.deleteAuthor(this.author.id).subscribe({
      next: () => {
        alert('Author deleted successfully!');
        this.router.navigate(['/authors']);
      },
      error: () => alert('Failed to delete author.')
    });
}
}
