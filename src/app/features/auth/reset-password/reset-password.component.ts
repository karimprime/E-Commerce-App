import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() { }

  errorMessage: string = "";

  isLoading: boolean = false;

  resetrSub: Subscription = new Subscription();

  changePasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
    rePassword: new FormControl('', [Validators.required]),
  }, { validators: this.confirmPassword.bind(this) });

  passwordVisibility: Record<"newPassword" | "rePassword", boolean> = {
    newPassword: false,
    rePassword: false
  };

  passwordChecks = {
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasMinLength: false,
    hasSpical: false
  };

  passwordFocused = false;

  get passwordControl(): FormControl {
    return this.changePasswordForm.get('newPassword') as FormControl;
  }


  togglePasswordVisibility(inputEl: HTMLInputElement, field: "newPassword" | "rePassword"): void {
    this.passwordVisibility[field] = !this.passwordVisibility[field];
    inputEl.type = this.passwordVisibility[field] ? 'text' : 'password';
  }

  updatePasswordStrength(): void {
    const password = this.passwordControl.value || "";
    this.passwordChecks = {
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpical: /[@$!%*?&]/.test(password),
      hasMinLength: password.length >= 8
    };
  }

  confirmPassword(control: AbstractControl) {
    const newPassword = control.get('newPassword')?.value;
    const rePassword = control.get('rePassword')?.value;

    return newPassword === rePassword ? null : { misMatch: true };
  }

  submitNewPassword() {
    if (this.changePasswordForm.valid) {
      this.isLoading = true;

      const email = sessionStorage.getItem('resetEmail'); // Retrieve email from sessionStorage
      const newPassword = this.changePasswordForm.get('newPassword')?.value;

      if (!email) {
        this.errorMessage = "Email not found! Please restart the process.";
        this.isLoading = false;
        return;
      }

      this.resetrSub = this.authService.resetPasswordToAPI({ email, newPassword }).subscribe({
        next: () => {
          sessionStorage.removeItem('resetEmail'); // Clear stored email after reset
          this.router.navigate(['/login']);
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Something went wrong!';
          this.isLoading = false;
        }
      });
    }
  }


  ngOnDestroy() {
    this.resetrSub.unsubscribe();
  }
}
