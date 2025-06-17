import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-author-search',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './author-search.component.html',
  styleUrl: './author-search.component.css',
})
export class AuthorSearchComponent implements OnInit {
  @Output() search = new EventEmitter<{
    firstName?: string;
    lastName?: string;
    nationality?: string;
  }>();
  authors: Author[] = [];
  hasSearched = false;
  private fb = inject(FormBuilder);

  searchForm: FormGroup = this.fb.group({
    firstName: [''],
    lastName: [''],
    nationality: [''],
  });

  ngOnInit(): void {}

  onSubmit(): void {
    this.search.emit(this.searchForm.value);
  }
}
