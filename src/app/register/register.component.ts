import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  errorMessage = '';
  private router = inject(Router);

  registerUserForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  register() {
    this.errorMessage = '';

     if (this.registerUserForm.invalid) {
      this.registerUserForm.markAllAsTouched();
      return;
    }

    const { username, password, confirmPassword } = this.registerUserForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
    this.authService.register(username, password).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        if (error.status === 400 && error.error === 'Username already exists') {
          this.errorMessage = 'Username already exists. Please choose another.';
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      },
    });
  }
}
