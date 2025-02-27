import { Component, inject, OnDestroy, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PasswordCheckLabelPipe } from '../../../shared/pipes/passwordCheckLabel/password-check-label.pipe';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, PasswordCheckLabelPipe],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  resetrSub: Subscription = new Subscription();

  changePasswordForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
    rePassword: new FormControl('', [Validators.required]),
  }, { validators: this.confirmPassword.bind(this) });

  passwordVisibility = signal<Record<'newPassword' | 'rePassword', boolean>>({
    newPassword: false,
    rePassword: false
  });

  passwordChecks = signal({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
    hasMinLength: false
  });

  passwordFocused = signal<boolean>(false);

  get passwordControl(): FormControl {
    return this.changePasswordForm.get('newPassword') as FormControl;
  }

  togglePasswordVisibility(inputEl: HTMLInputElement, field: 'newPassword' | 'rePassword'): void {
    this.passwordVisibility.set({ ...this.passwordVisibility(), [field]: !this.passwordVisibility()[field] });
    inputEl.type = this.passwordVisibility()[field] ? 'text' : 'password';
  }

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

  confirmPassword(control: AbstractControl) {
    const newPassword = control.get('newPassword')?.value;
    const rePassword = control.get('rePassword')?.value;
    return newPassword === rePassword ? null : { misMatch: true };
  }


  submitNewPassword() {
    if (this.changePasswordForm.valid) {
      this.isLoading.set(true);

      const email = sessionStorage.getItem('resetEmail');
      const newPassword = this.changePasswordForm.get('newPassword')?.value || '';

      if (!email) {
        this.errorMessage.set(this.translate.instant('auth.reset_password.email_not_found'));
        this.isLoading.set(false);
        return;
      }

      this.resetrSub = this.authService.resetPasswordToAPI({ email, newPassword }).subscribe({
        next: () => {
          sessionStorage.removeItem('resetEmail');
          this.router.navigate(['/auth/login']);
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false)
      });
    }
  }



  ngOnDestroy() {
    this.resetrSub.unsubscribe();
  }
}
