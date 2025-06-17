import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-author-search',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './author-search.component.html',
  styleUrl: './author-search.component.css'
})
export class AuthorSearchComponent implements OnInit {

   @Output() search = new EventEmitter<{ firstName?: string; lastName?: string; nationality?: string }>();
  searchForm: FormGroup;
  authors: Author[] = [];
  hasSearched = false;

    constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      nationality: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void { 
    this.search.emit(this.searchForm.value);
  }
}