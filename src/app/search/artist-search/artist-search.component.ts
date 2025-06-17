import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-artist-search',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './artist-search.component.html',
  styleUrl: './artist-search.component.css'
})
export class ArtistSearchComponent implements OnInit {

   @Output() search = new EventEmitter<{ firstName?: string; lastName?: string; nationality?: string }>();
  searchForm: FormGroup;
  artists: Artist[] = [];
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