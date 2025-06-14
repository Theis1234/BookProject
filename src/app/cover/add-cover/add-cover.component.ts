import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoverService } from '../../services/cover.service';
import { CreateCoverDTO } from '../../models/create-cover-dto';
import { Artist } from '../../models/artist.model';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-add-cover',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-cover.component.html',
  styleUrl: './add-cover.component.css'
})
export class AddCoverComponent {
  books: Book[] = [];
  artists: Artist[] = [];

  cover: CreateCoverDTO = {
  title: '',
  digitalOnly: false,
  bookId: 0,
  artistIds: []
};

  constructor(
    private coverService: CoverService, 
    private bookService: BookService,
    private artistService: ArtistService,
    private router: Router, 
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
  this.bookService.getBooks().subscribe(books => {
    this.books = books;
  });
  this.artistService.getArtists().subscribe(artists => {
    this.artists = artists;
  });
}
  onSubmit() {
    if (!this.cover) return;

    this.coverService.createCover(this.cover).subscribe({
      next: () => {
        alert('Cover added successfully!');
        this.router.navigate(['/covers']);
      },
      error: () => alert('Failed to add cover.')
    });
  }
  onArtistToggle(event: Event) {
  const checkbox = event.target as HTMLInputElement;
  const artistId = parseInt(checkbox.value);

  if (checkbox.checked) {
    this.cover.artistIds.push(artistId);
  } else {
    this.cover.artistIds = this.cover.artistIds.filter(id => id !== artistId);
  }
}
}