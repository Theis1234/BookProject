import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CoverService } from '../services/cover.service';
import { Cover } from '../models/cover.model';

@Component({
  selector: 'app-cover',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cover.component.html',
  styleUrl: './cover.component.css'
})
export class CoverComponent implements OnInit{
  isAdminUser: boolean = false;
  covers: Cover[] = [];
  
  constructor(private coverService: CoverService, private authService: AuthService) {}

  ngOnInit(): void {
    this.coverService.getCovers().subscribe({
      next: (data) => this.covers = data,
      error: (err) => console.error('Error loading covers', err)
    });
    this.authService.role$.subscribe(role => { this.isAdminUser = role === 'Admin' });
  }

}
