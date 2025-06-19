import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 isLoggedIn = false;
  userRole: string | null = null;
  username: string | null = null;

  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.loggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

     this.authService.role$.subscribe(role => {
      this.userRole = role;
    });
    this.authService.username$.subscribe(username => {
      this.username = username;
    });
  }
}
