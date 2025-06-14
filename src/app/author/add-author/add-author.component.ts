import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorService } from '../../services/author.service';
import { CreateAuthorDTO } from '../../models/create-author-dto';

@Component({
  selector: 'app-add-author',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.css'
})
export class AddAuthorComponent {
  author: CreateAuthorDTO = {
  firstName: '',
  lastName: '',
  nationality: '',
  dateOfBirth: '',
  numberOfBooksPublished: 0,
  lastPublishedBook: ''
};

  constructor(
    private authorService: AuthorService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    if (!this.author) return;

    this.authorService.createAuthor(this.author).subscribe({
      next: () => {
        alert('Author added successfully!');
        this.router.navigate(['/authors']);
      },
      error: () => alert('Failed to add author.')
    });
  }
}