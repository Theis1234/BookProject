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
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-artist-search',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './artist-search.component.html',
  styleUrl: './artist-search.component.css',
})
export class ArtistSearchComponent implements OnInit {
  @Output() search = new EventEmitter<{
    firstName?: string;
    lastName?: string;
    nationality?: string;
  }>();
  artists: Artist[] = [];
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
