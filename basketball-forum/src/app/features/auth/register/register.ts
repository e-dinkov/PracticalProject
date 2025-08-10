import { AfterViewInit, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { emailValidator } from '../login/login';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements AfterViewInit {
  protected authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  registerForm: FormGroup;

  ngAfterViewInit(): void {
    console.dir(this.registerForm);
  }

  constructor() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, emailValidator]],
      passwords: this.formBuilder.group(
        {
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(5),
              Validators.pattern(/^[a-zA-Z0-9]{4,}$/),
            ],
          ],
          rePassword: ['', [Validators.required, Validators.minLength(5)]],
        },
        { validator: this.passwordMatchValidator }
      ),

      phone: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get username(): AbstractControl | null {
    return this.registerForm.get('username');
  }

  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }
  get passwords(): FormGroup {
    return this.registerForm.get('passwords') as FormGroup;
  }
  get password(): AbstractControl | null {
    return this.passwords.get('password');
  }

  get rePassword(): AbstractControl | null {
    return this.passwords.get('rePassword');
  }
  get phone(): AbstractControl | null {
    return this.registerForm.get('phone');
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

  get isPasswordsValid(): boolean {
    return (
      (this.passwords?.invalid &&
        (this.passwords?.dirty || this.passwords?.touched)) ||
      false
    );
  }

  get usernameErrorMessage(): string {
    if (this.username?.hasError('required')) {
      return 'Username is required';
    } else if (this.username?.hasError('minlength')) {
      return 'Username must be at least 5 characters';
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
  get passwordErrorMessage(): string {
    if (this.password?.hasError('required')) {
      return 'Password is required';
    } else if (this.password?.hasError('minlength')) {
      return 'Password must be at least 5 characters';
    }
    if (this.registerForm.get('passwords')?.hasError('passwordMismatch')) {
      return 'Passwords do not match';
    }
    return '';
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);

      const { username, email, phone } = this.registerForm.value;
      const { password, rePassword } = this.registerForm.value.passwords;

      this.authService
        .register(username, email, password, rePassword, phone)
        .subscribe({
          next: () => {
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.log('Registration failed', err);
            this.markFormGroupTouched();
          },
        });
    }
  }
  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach((key) => {
      const control = this.registerForm.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach((nestedKey) => {
          const nestedControl = control.get(nestedKey);
          nestedControl?.markAsTouched();
        });
      } else {
        control?.markAsTouched();
      }
    });
  }
  private passwordMatchValidator(
    passwordsControl: AbstractControl
  ): ValidationErrors | null {
    const password = passwordsControl.get('password');
    const rePassword = passwordsControl.get('rePassword');

    if (password && rePassword && password.value !== rePassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
