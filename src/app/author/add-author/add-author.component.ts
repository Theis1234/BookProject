import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthorService } from '../../services/author.service';
import { CreateAuthorDTO } from '../../models/create-author-dto';

@Component({
  selector: 'app-add-author',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.css',
})
export class AddAuthorComponent {
  submitted = false;

  private authorService = inject(AuthorService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  addAuthorForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    nationality: ['', [Validators.maxLength(30)]],
    dateOfBirth: ['', [Validators.required]],
    numberOfBooksPublished: [0, [Validators.max(100000)]],
    lastPublishedBook: ['', [Validators.maxLength(100)]],
  });

  onSubmit() {
    if (this.addAuthorForm.invalid) {
      this.addAuthorForm.markAllAsTouched();
      return;
    }

    this.submitted = true;

    const author: CreateAuthorDTO = this.addAuthorForm.value;

    this.authorService.createAuthor(author).subscribe({
      next: () => {
        alert('Author added successfully!');
        this.router.navigate(['/authors']);
      },
      error: () => alert('Failed to add author.'),
    });
  }
}
