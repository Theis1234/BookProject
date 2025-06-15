import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cover } from '../../models/cover.model';
import { CoverService } from '../../services/cover.service';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-edit-cover',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-cover.component.html',
  styleUrl: './edit-cover.component.css'
})
export class EditCoverComponent {
  books: Book[] = [];
  artists: Artist[] = [];
  artistIds: number[] = [];
  cover: Cover | null = null;

  constructor(
    private coverService: CoverService, 
    private bookService: BookService,
    private artistService: ArtistService,
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));

  this.coverService.getCoverById(id).subscribe({
    next: (data) => {
      this.cover = data;

      this.bookService.getBooks().subscribe(books => {
        this.books = books;
      });

      this.artistService.getArtists().subscribe(artists => {
        this.artists = artists;

        this.artistIds = data.artistCovers?.map(ac => ac.artistId) ?? [];
      });
    },
    error: () => alert('Error loading cover')
  });
}

  onSubmit() {
    if (!this.cover) return;

    if (this.artists.length === 0) {
    alert('Please select at least one artist.');
    return;
  }

    const coverDto = {
    title: this.cover.title,
    digitalOnly: this.cover.digitalOnly,
    bookId: this.cover.bookId,
    artistIds: this.artistIds
  };

    this.coverService.updateCover(this.cover.id, coverDto).subscribe({
      next: () => {
        alert('Cover updated successfully!');
        this.router.navigate(['/covers']);
      },
      error: () => alert('Failed to update cover.')
    });
  }
  onDelete() {
  if (!this.cover) return;

  this.coverService.deleteCover(this.cover.id).subscribe({
      next: () => {
        alert('Cover deleted successfully!');
        this.router.navigate(['/covers']);
      },
      error: () => alert('Failed to delete cover.')
    });
}
onArtistToggle(event: Event) {
  const checkbox = event.target as HTMLInputElement;
  const artistId = Number(checkbox.value);

  if (checkbox.checked) {
    if (!this.artistIds.includes(artistId)) {
      this.artistIds.push(artistId);
    }
  } else {
    this.artistIds = this.artistIds.filter(id => id !== artistId);
  }
}
}