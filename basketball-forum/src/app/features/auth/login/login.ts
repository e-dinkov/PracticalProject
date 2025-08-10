import { AfterViewInit, Component, inject } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements AfterViewInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  ngAfterViewInit(): void {
    console.dir(this.loginForm);
  }

  loginForm: FormGroup;
  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get emailErrorMessage(): string {
    if (this.email?.hasError('required')) {
      return 'Email is required';
    } else if (this.email?.hasError('email')) {
      return 'Email is not valid';
    }
    return '';
  }
  get passwordErrorMessage(): string {
    if (this.password?.hasError('required')) {
      return 'Password is required';
    } else if (this.password?.hasError('minlength')) {
      return 'Password must be at least 5 characters';
    }
    return '';
  }
  get emailError(): boolean {
    return (
      (this.email?.invalid && (this.email?.dirty || this.email?.touched)) ||
      false
    );
  }

  get passwordError(): boolean {
    return (
      (this.password?.invalid &&
        (this.password?.dirty || this.password?.touched)) ||
      false
    );
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log('Login failed', err);
          this.markFormGroupTouched();
        },
      });
    }
  }
  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
export function emailValidator(control: any) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(control.value) ? null : { email: true };
}
