import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorService } from '../../services/author.service';
import { CreateAuthorDTO } from '../../models/create-author-dto';

@Component({
  selector: 'app-add-author',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.css'
})
export class AddAuthorComponent {
  addAuthorForm: FormGroup;
  submitted = false;


  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService, 
    private router: Router
  ) {
    this.addAuthorForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      nationality: [''],
      dateOfBirth: ['',Validators.required],
      numberOfBooksPublished: [0],
      lastPublishedBook: ['']
    })
  }

  onSubmit() {
    if (this.addAuthorForm.invalid){
      this.addAuthorForm.markAllAsTouched()
      return;
    };

    this.submitted = true;

    const author: CreateAuthorDTO = this.addAuthorForm.value;

    this.authorService.createAuthor(author).subscribe({
      next: () => {
        alert('Author added successfully!');
        this.router.navigate(['/authors']);
      },
      error: () => alert('Failed to add author.')
    });
  }
}