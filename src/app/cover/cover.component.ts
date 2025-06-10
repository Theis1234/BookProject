import { Component, OnInit } from '@angular/core';
import { Author } from '../models/author.model';
import { AuthorService } from '../services/author.service';
import { CommonModule } from '@angular/common';
import { Cover } from '../models/cover.model';
import { CoverService } from '../services/cover.service';

@Component({
  selector: 'app-cover',
  imports: [CommonModule],
  templateUrl: './cover.component.html',
  styleUrl: './cover.component.css'
})
export class CoverComponent implements OnInit {
    covers: Cover[] = [];
    constructor(private coverService: CoverService) {}
  
    ngOnInit(): void {
      this.coverService.getCovers().subscribe({
        next: (data) => this.covers = data,
        error: (err) => console.error('Error loading authors', err)
      });
    }
}
