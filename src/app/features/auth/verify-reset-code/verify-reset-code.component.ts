import { Component, inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VerifyResetCodeRequestSuccess, APIResponseMessage } from '../../../shared/interface/data';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-verify-reset-code',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './verify-reset-code.component.html',
  styleUrls: ['./verify-reset-code.component.scss']
})
export class VerifyResetCodeComponent implements OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  verifySub: Subscription = new Subscription();

  resetCodeForm = new FormGroup({
    resetCode: new FormControl<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
  });

  checkResetCode() {
    if (this.resetCodeForm.invalid) {
      this.errorMessage.set(this.translate.instant('auth.verify_reset_code.invalid_code'));
      return;
    }

    this.isLoading.set(true);

    // Ensure `resetCode` is a string
    const resetCodeRequest = { resetCode: this.resetCodeForm.value.resetCode as string };

    this.verifySub = this.authService.sendCheckCodeToAPI(resetCodeRequest).subscribe({
      next: (res: VerifyResetCodeRequestSuccess | APIResponseMessage) => {
        if ('status' in res && res.status === "Success") {
          this.router.navigate(['/auth/reset-password']);
        } else {
          this.errorMessage.set(this.translate.instant('auth.verify_reset_code.invalid_code'));
        }
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  ngOnDestroy() {
    if (this.verifySub) {
      this.verifySub.unsubscribe();
    }
  }
}
