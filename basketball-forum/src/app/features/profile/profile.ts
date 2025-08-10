import { Component, inject } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { emailValidator } from '../auth/login/login';

import { AuthService } from '../../core/services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  protected authService = inject(AuthService);
  protected userEmail = 'fsaaf@gmail.com';
  protected userPhone = '1234567890';
  private formbuilder = inject(FormBuilder);
  readonly currentUser = this.authService.currentUser;
  isEditMode: boolean = false;
  profileForm: FormGroup;
  currentUserDetails: User | null = null;

  constructor() {
    this.profileForm = this.formbuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, emailValidator]],
      phone: ['', [Validators.required]],
    });
  }
  get username(): AbstractControl | null {
    return this.profileForm.get('username');
  }

  get email(): AbstractControl | null {
    return this.profileForm.get('email');
  }
  get phone(): AbstractControl | null {
    return this.profileForm.get('phone');
  }
  get isUsernameValid(): boolean {
    return (
      (this.username?.invalid &&
        (this.username?.dirty || this.username?.touched)) ||
      false
    );
  }

  get isEmailValid(): boolean {
    return (
      (this.email?.invalid && (this.email?.dirty || this.email?.touched)) ||
      false
    );
  }
  get usernameErrorMessage(): string {
    if (this.username?.hasError('required')) {
      return 'Username is required';
    } else if (this.username?.hasError('minlength')) {
      return 'Username must be at least 4 characters';
    }
    return '';
  }
  get emailErrorMessage(): string {
    if (this.email?.hasError('required')) {
      return 'Email is required';
    } else if (this.email?.hasError('email')) {
      return 'Email is not valid';
    }
    return '';
  }

  onEdit(): void {
    const user = this.currentUser();
    this.isEditMode = true;
    this.profileForm.patchValue({
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
    });
  }
  onCancel(): void {
    this.isEditMode = false;
    this.profileForm.reset();
  }
  onSave(): void {
    if (this.profileForm.valid) {
      const user = this.profileForm.value;
      const updatedUser = { ...this.currentUser(), ...user };

      this.authService.updateUser(updatedUser).subscribe({
        next: (res:any) => {
          console.log('User updated:', res);
          this.isEditMode = false;
          this.profileForm.reset();
        },
        error: (err:any) => {
          console.error('Update failed:', err);
        },
      });
    }
  }
}
