import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-edit-author',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-author.component.html',
  styleUrl: './edit-author.component.css',
})
export class EditAuthorComponent implements OnInit {
  submitted = false;
  author: Author | null = null;
  private authorService = inject(AuthorService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  editAuthorForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    nationality: ['', [Validators.maxLength(30)]],
    dateOfBirth: ['', [Validators.required]],
    numberOfBooksPublished: [0, [Validators.max(100000)]],
    lastPublishedBook: ['', [Validators.maxLength(100)]],
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.authorService.getById(id).subscribe({
      next: (data) => {
        this.author = data;
        this.editAuthorForm.patchValue(data);
      },
      error: () => alert('Error loading author'),
    });
  }
  onSubmit() {
    if (this.editAuthorForm.invalid) {
      this.editAuthorForm.markAllAsTouched();
      return;
    }

    const updatedAuthor: Author = {
      ...this.editAuthorForm.value,
      id: Number(this.route.snapshot.paramMap.get('id')),
    };

    this.authorService.updateAuthor(updatedAuthor.id, updatedAuthor).subscribe({
      next: () => {
        alert('Author updated successfully!');
        this.router.navigate(['/authors']);
      },
      error: () => alert('Failed to update author.'),
    });
  }
  onDelete() {
    if (!this.author) return;

    this.authorService.delete(this.author.id).subscribe({
      next: () => {
        alert('Author deleted successfully!');
        this.router.navigate(['/authors']);
      },
      error: () => alert('Failed to delete author.'),
    });
  }
}
