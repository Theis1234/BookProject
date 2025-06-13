import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cover } from '../../models/cover.model';
import { CoverService } from '../../services/cover.service';

@Component({
  selector: 'app-edit-cover',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-cover.component.html',
  styleUrl: './edit-cover.component.css'
})
export class EditCoverComponent {

  cover: Cover | null = null;

  constructor(
    private coverService: CoverService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.coverService.getCoverById(id).subscribe({
      next: (data) => this.cover = data,
      error: () => alert('Error loading cover')
    });
  }
  onSubmit() {
    if (!this.cover) return;

    this.coverService.updateCover(this.cover.id, this.cover).subscribe({
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
}