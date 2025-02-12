import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VerifyResetCodeRequestSuccess, APIResponseMessage } from '../../../shared/interface/data';

@Component({
  selector: 'app-verify-reset-code',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verify-reset-code.component.html',
  styleUrls: ['./verify-reset-code.component.scss']
})
export class VerifyResetCodeComponent implements OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  errorMessage: string = "";
  isLoading: boolean = false;
  verifySub: Subscription = new Subscription();

  resetCodeForm = new FormGroup({
    resetCode: new FormControl<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
  });

  checkResetCode() {
    if (this.resetCodeForm.invalid) {
      this.errorMessage = "Please enter a valid 6-digit reset code.";
      return;
    }

    this.isLoading = true;

    // Ensure `resetCode` is a string
    const resetCodeRequest = { resetCode: this.resetCodeForm.value.resetCode as string };

    this.verifySub = this.authService.sendCheckCodeToAPI(resetCodeRequest).subscribe({
      next: (res: VerifyResetCodeRequestSuccess | APIResponseMessage) => {
        console.log("API Response:", res);

        // Check if response contains 'status' before accessing it
        if ('status' in res && res.status === "Success") {
          this.router.navigate(['/reset-password']);
        } else {
          this.errorMessage = "Invalid reset code!";
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error("API Error:", err);
        this.errorMessage = err.error?.message || "Invalid reset code!";
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.verifySub) {
      this.verifySub.unsubscribe();
    }
  }
}
