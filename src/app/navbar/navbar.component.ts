import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userRole: string | null = null;

  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.loggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

     this.authService.role$.subscribe(role => {
      this.userRole = role;
    });
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  isAdmin(): boolean {
    return this.userRole === 'Admin';
  }
}
