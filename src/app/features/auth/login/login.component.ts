import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { PasswordCheckLabelPipe } from '../../../shared/pipes/passwordCheckLabel/password-check-label.pipe';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, PasswordCheckLabelPipe, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);


  // Form State
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
    ]),
  });

  // UI State using Signals
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  passwordVisibility = signal<{ password: boolean }>({ password: false });
  passwordFocused = signal<boolean>(false);

  // Password Strength Checks using Signals
  passwordChecks = signal({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasMinLength: false,
    hasSpecial: false
  });

  // Subscriptions
  private loginSub: Subscription = new Subscription();

  // Getter for password control
  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  // Toggle password visibility
  togglePasswordVisibility(inputEl: HTMLInputElement, field: 'password'): void {
    this.passwordVisibility.set({ ...this.passwordVisibility(), [field]: !this.passwordVisibility()[field] });
    inputEl.type = this.passwordVisibility()[field] ? 'text' : 'password';
  }

  // Update password strength checks
  updatePasswordStrength(): void {
    const password = this.passwordControl.value || '';
    this.passwordChecks.set({
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[@$!%*?&]/.test(password),
      hasMinLength: password.length >= 8
    });
  }

  // Handle form submission
  LoginSubmit(): void {
    if (this.loginForm.invalid || this.isLoading()) return;

    this.isLoading.set(true);
    this.errorMessage.set(''); // Reset error message

    this.loginSub = this.authService.sendLoginToAPI(this.loginForm.value).subscribe({
      next: (res) => {
        if ('token' in res && res.message === 'success') {
          localStorage.setItem('userToken', res.token);
          this.authService.initializeUser();
          this.router.navigate(['/home']);
        }
      }
    });
  }

  // Clean up subscriptions
  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }
}
