import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  showResetCodeInput = signal<boolean>(false);
  showPasswordFields = signal<boolean>(false);

  forgetSub: Subscription = new Subscription();

  forgetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  passwordResetForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rePassword: new FormControl('', [Validators.required])
  });

  sendResetEmail() {
    if (!this.forgetPasswordForm.valid) {
      this.errorMessage.set(this.translate.instant('auth.forget_password.invalid_email'));
      return;
    }

    this.isLoading.set(true);
    const email = this.forgetPasswordForm.get('email')?.value ?? '';

    // Store email in sessionStorage only if it's a valid string
    if (email) {
      sessionStorage.setItem('resetEmail', email);
    }

    this.forgetSub = this.authService.sendResetCodeToAPI({ email }).subscribe({
      next: (res) => {
        if (res.statusMsg === "success") {
          this.router.navigate(['/auth/verify-reset-code']);
        }
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }
  ngOnDestroy() {
    this.forgetSub.unsubscribe();
  }
}
