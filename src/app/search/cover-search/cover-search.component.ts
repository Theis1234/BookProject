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
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cover-search',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cover-search.component.html',
  styleUrl: './cover-search.component.css',
})
export class CoverSearchComponent implements OnInit {
  @Output() search = new EventEmitter<{
    title?: string;
    digitalOnly?: boolean;
  }>();
  books: Book[] = [];
  hasSearched = false;
  private fb = inject(FormBuilder);

  searchForm: FormGroup = this.fb.group({
    title: [''],
    digitalOnly: [''],
  });

  ngOnInit(): void {}

  onSubmit(): void {
    const { title, digitalOnly } = this.searchForm.value;

    const result = {
      title: title?.trim() || undefined,
      digitalOnly:
        digitalOnly === 'true'
          ? true
          : digitalOnly === 'false'
          ? false
          : undefined,
    };

    this.search.emit(result);
  }
}
