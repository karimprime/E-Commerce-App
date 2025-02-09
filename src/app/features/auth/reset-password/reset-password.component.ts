import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  constructor(private authService: AuthService) { }
  private router = inject(Router);


  errorMessage: string = "";

  isLoading: boolean = false;

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
    hasspical: false
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
      hasspical: /[@$!%*?&]/.test(password),
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
      this.authService.resetPasswordToAPI(this.changePasswordForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Something went wrong!';
        }
      });
    }
  }
}
