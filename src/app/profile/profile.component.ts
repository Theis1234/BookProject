import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserProfileDTO } from '../models/user-profile-dto';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userProfileForm!: FormGroup;
  userProfile: UserProfileDTO | null = null;
  protected router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.authService.getCurrentUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.userProfileForm = this.fb.group({
          firstName: [profile.firstName],
          lastName: [profile.lastName],
          age: [profile.age],
          pictureUrl: [profile.pictureUrl],
          bio: [profile.bio],
        });
      },
      error: (err) => console.error('Failed to load profile', err),
    });
  }

  onSubmit() {
    if (this.userProfileForm.invalid || !this.userProfile) return;

    const updatedProfile: UserProfileDTO = {
      ...this.userProfile,
      ...this.userProfileForm.value,
    };

    this.authService.updateUserProfile(updatedProfile).subscribe({
      next: () => alert('Profile updated successfully!'),
      error: (err) => console.error('Update failed', err),
    });
    this.router.navigate([`/`]);
  }
}